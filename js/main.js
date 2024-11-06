/*
rotation system based off of SRS
https://tetris.wiki/Super_Rotation_System#How_Guideline_SRS_Really_Works
to implement: 
- full scoring system (including hard drop and t-spins)
- game over
- home screen
- DAS
*/
var level = 0;
const DROPSPEEDS = [48,43,38,33,28,23,18,13,8,6,5,5,5,4,4,4,3,3,3,2,2,2,2,2,2,2,2,2,2];
var dropSpeed = DROPSPEEDS[level];
var framesBetweenDrops = 0;
var gameBoard = [];
var gameBoardDivs = [];
var score = 0;
var pieceBag = [];
var pieceQueue = [];
var pieceQueueDivs = [];
var canHoldPiece = true;
var heldPiece = 0;
var heldPieceDivs = [];
var notSwitchedHeldPiece = true;
var gameEnded = false;
var pieceLockTimer = 0;
var totalLinesCleared = 0;
var combo = 0;
var previousDifficultClear = false;
var killScreenOn = false;
const scoreText = document.getElementById("score_text");
const levelText = document.getElementById("level_text");
const COLORS = ["#7F7F7F", "#00FFFF", "#0000FF", "#FF7F00", "#FFFF00", "#00FF00", "#800080", "#FF0000"];
const BOUNDINGBOXES = [[],[[[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,1],[0,0,0,0,0],[0,0,0,0,0]],[[0,0,0,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],[[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,0],[0,0,0,0,0],[0,0,0,0,0]],[[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,0,0,0]]],
                      [[[1,0,0],[1,1,1],[0,0,0]],[[0,1,1],[0,1,0],[0,1,0]],[[0,0,0],[1,1,1],[0,0,1]],[[0,1,0],[0,1,0],[1,1,0]]],
                      [[[0,0,1],[1,1,1],[0,0,0]],[[0,1,0],[0,1,0],[0,1,1]],[[0,0,0],[1,1,1],[1,0,0]],[[1,1,0],[0,1,0],[0,1,0]]],
                      [[[0,1,1],[0,1,1],[0,0,0]],[[0,0,0],[0,1,1],[0,1,1]],[[0,0,0],[1,1,0],[1,1,0]],[[1,1,0],[1,1,0],[0,0,0]]],
                      [[[0,1,1],[1,1,0],[0,0,0]],[[0,1,0],[0,1,1],[0,0,1]],[[0,0,0],[0,1,1],[1,1,0]],[[1,0,0],[1,1,0],[0,1,0]]],
                      [[[0,1,0],[1,1,1],[0,0,0]],[[0,1,0],[0,1,1],[0,1,0]],[[0,0,0],[1,1,1],[0,1,0]],[[0,1,0],[1,1,0],[0,1,0]]],
                      [[[1,1,0],[0,1,1],[0,0,0]],[[0,0,1],[0,1,1],[0,1,0]],[[0,0,0],[1,1,0],[0,1,1]],[[0,1,0],[1,1,0],[1,0,0]]]];
var currentPiece = {
  previousX: 0,
  previousY: 0,
  x: 0, // coordinates of the top left space of the bounding box.
  y: 0, 
  type: 0,
  boundingBox: [],
  previousBoundingBox: [],
  rotation: 0
};
/* bounding boxes for the tetrominoes are set up as follows:

 - - - - -  - - - - -  - - - - -  - - x - -
 - - - - -  - - x - -  - - - - -  - - x - -
 - x x x x  - - x - -  x x x x -  - - x - -
 - - - - -  - - x - -  - - - - -  - - x - -
 - - - - -  - - x - -  - - - - -  - - - - -
 
 x - -  - x x  - - -  - x -
 x x x  - x -  x x x  - x -
 - - -  - x -  - - x  x x -
 
 - - x  - x -  - - -  x x -
 x x x  - x -  x x x  - x -
 - - -  - x x  x - -  - x -
 
 - x x  - - -  - - -  x x -
 - x x  - x x  x x -  x x -
 - - -  - x x  x x -  - - -
 
 - x x  - x -  - - -  x - -
 x x -  - x x  - x x  x x -
 - - -  - - x  x x -  - x -
 
 - x -  - x -  - - -  - x -
 x x x  - x x  x x x  x x -
 - - -  - x -  - x -  - x -
 
 x x -  - - x  - - -  - x -
 - x x  - x x  x x -  x x -
 - - -  - x -  - x x  x - -
*/

setUpGame();
var loop = setInterval(animate, 16.67);
function animate(){
  if(!gameEnded){
    scoreText.innerHTML = "score: "+score;
    levelText.innerHTML = "level: "+level;
    if(framesBetweenDrops >= dropSpeed){
      if(isNotObstructed(0,1,currentPiece.rotation)){
        currentPiece.previousX = currentPiece.x;
        currentPiece.previousY = currentPiece.y;
        currentPiece.y ++;
        drawBlock(currentPiece.previousX, currentPiece.previousY, 0, currentPiece.boundingBox);
        drawBlock(currentPiece.x, currentPiece.y, currentPiece.type, currentPiece.boundingBox);
        pieceLockTimer = 0;
      } else {
        pieceLockTimer += dropSpeed;
        if(pieceLockTimer >= 30){
          notSwitchedHeldPiece = true;
          for(var i = 0; i < currentPiece.boundingBox.length; i ++){
            for(var j = 0; j < currentPiece.boundingBox[i].length; j ++){
              if(currentPiece.boundingBox[i][j]){
                gameBoard[currentPiece.y+i][currentPiece.x+j] = currentPiece.type;
              }
            }
          }
          clearLines();
          createNewPiece();
          pieceLockTimer = 0;
        }
      }
      framesBetweenDrops = 0;
    } else {
      framesBetweenDrops ++;
    }
  }
}

document.onkeydown = function(){
  key = window.event;
  if(gameEnded){return;}
  switch(key.key){
    case "ArrowLeft":
      if(isNotObstructed(-1,0,currentPiece.rotation)){
        currentPiece.previousX = currentPiece.x;
        currentPiece.previousY = currentPiece.y;
        currentPiece.x --;
        drawBlock(currentPiece.previousX, currentPiece.previousY, 0, currentPiece.boundingBox);
        drawBlock(currentPiece.x, currentPiece.y, currentPiece.type, currentPiece.boundingBox);
      }
      break;
    case "ArrowRight":
      if(isNotObstructed(1,0,currentPiece.rotation)){
        currentPiece.previousX = currentPiece.x;
        currentPiece.previousY = currentPiece.y;
        currentPiece.x ++;
        drawBlock(currentPiece.previousX, currentPiece.previousY, 0, currentPiece.boundingBox);
        drawBlock(currentPiece.x, currentPiece.y, currentPiece.type, currentPiece.boundingBox);
      }
      break;
    case " ":
      notSwitchedHeldPiece = true;
      currentPiece.previousX = currentPiece.x;
      currentPiece.previousY = currentPiece.y;
      drawBlock(currentPiece.previousX, currentPiece.previousY, 0, currentPiece.boundingBox);
      while(isNotObstructed(0,1,currentPiece.rotation)){
        currentPiece.y ++;
        score += 2*level;
      }
      drawBlock(currentPiece.x, currentPiece.y, currentPiece.type, currentPiece.boundingBox);
      for(var k = 0; k < currentPiece.boundingBox.length; k ++){
        for(var l = 0; l < currentPiece.boundingBox[k].length; l ++){
          if(currentPiece.boundingBox[k][l]){
            gameBoard[currentPiece.y+k][currentPiece.x+l] = currentPiece.type;
          }
        }
      }
      clearLines();
      createNewPiece();
      pieceLockTimer = 0;
      break;
    case "ArrowUp":
      if(isNotObstructed(0,0,(currentPiece.rotation+1)%4)){
        currentPiece.previousBoundingBox = currentPiece.boundingBox;
        currentPiece.rotation = (currentPiece.rotation+1)%4;
        currentPiece.boundingBox = BOUNDINGBOXES[currentPiece.type][currentPiece.rotation];
        drawBlock(currentPiece.x, currentPiece.y, 0, currentPiece.previousBoundingBox);
        drawBlock(currentPiece.x, currentPiece.y, currentPiece.type, currentPiece.boundingBox);
      } else {
        checkWallKicks(currentPiece.rotation, (currentPiece.rotation+1)%4);
      }
      break;
    case "z":
      if(isNotObstructed(0,0,(currentPiece.rotation == 0) ? 3 : currentPiece.rotation-1)){
        currentPiece.previousBoundingBox = currentPiece.boundingBox;
        currentPiece.rotation = (currentPiece.rotation == 0) ? 3 : currentPiece.rotation-1;
        currentPiece.boundingBox = BOUNDINGBOXES[currentPiece.type][currentPiece.rotation];
        drawBlock(currentPiece.x, currentPiece.y, 0, currentPiece.previousBoundingBox);
        drawBlock(currentPiece.x, currentPiece.y, currentPiece.type, currentPiece.boundingBox);
      } else {
        checkWallKicks(currentPiece.rotation, (currentPiece.rotation == 0) ? 3 : currentPiece.rotation-1);
      }
      break;
    case "c":
      if(canHoldPiece && notSwitchedHeldPiece){
        notSwitchedHeldPiece = false;
        drawBlock(currentPiece.x, currentPiece.y, 0, currentPiece.boundingBox);
        if(heldPiece == 0){
          heldPiece = currentPiece.type;
          createNewPiece();
          drawHeldPieceBlock(heldPiece);
        } else {
          heldPiece += currentPiece.type;
          currentPiece.type = heldPiece - currentPiece.type;
          heldPiece -= currentPiece.type;
          if(currentPiece.type == 1){
            currentPiece.y = -2;
            currentPiece.previousY = -2;
          } else {
            currentPiece.y = 0;
            currentPiece.previousY = 0;
          }
          if(currentPiece.type == 1){
            currentPiece.previousX = 2;
            currentPiece.x = 2;
          } else {
            currentPiece.previousX = 3;
            currentPiece.x = 3;
          }
          currentPiece.rotation = 0;
          currentPiece.boundingBox = BOUNDINGBOXES[currentPiece.type][0];
          currentPiece.previousBoundingBox = currentPiece.boundingBox;
          for(let i = 0; i < 4; i ++){
            heldPieceDivs[i].remove();
          }
          drawHeldPieceBlock(heldPiece);
        }
      }
      break;
  }
}

function generatePiece(){
  if(pieceBag.length == 0){
    for(var i = 0; i < 7; i ++){
      pieceBag.splice(Math.floor(Math.random()*(pieceBag.length+1)),0,i+1);
    }
  }
  return pieceBag.pop();
}

function createNewPiece(){
  console.log(pieceQueue.length);
  currentPiece.type = shiftPieceQueue();
  pieceQueue.push(generatePiece());
  drawPieceQueueBlock(pieceQueue[4]);
  if(currentPiece.type == 1){
    currentPiece.y = -2;
    currentPiece.previousY = -2;
  } else {
    currentPiece.y = 0;
    currentPiece.previousY = 0;
  }
  if(currentPiece.type == 1){
    currentPiece.previousX = 2;
    currentPiece.x = 2;
  } else {
    currentPiece.previousX = 3;
    currentPiece.x = 3;
  }
  currentPiece.rotation = 0;
  currentPiece.boundingBox = BOUNDINGBOXES[currentPiece.type][0];
  currentPiece.previousBoundingBox = currentPiece.boundingBox;
}

function setUpGame(){
  const body = document.getElementById("body");
  for(var k = 0; k < 5; k ++){
    pieceQueue.push(generatePiece());
  }
  drawPieceQueue();
  createNewPiece();
  for(var i = 0; i < 20; i ++){
    gameBoard.push([]);
    gameBoardDivs.push([]);
    for(var j = 0; j < 10; j ++){
      gameBoard[i].push(0);
      gameBoardDivs[i].push(document.createElement("div"));
      gameBoardDivs[i][j].style.marginTop = (i*20)+"px";
      gameBoardDivs[i][j].style.marginLeft = (j*20)+"px";
      body.appendChild(gameBoardDivs[i][j]);
    }
  }
  drawBlock(currentPiece.previousX, currentPiece.previousY, 0, currentPiece.boundingBox);
  drawBlock(currentPiece.x, currentPiece.y, currentPiece.type, currentPiece.boundingBox);
}
