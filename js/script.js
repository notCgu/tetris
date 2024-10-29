/*
no sprites are used because they are janky as hell
rotation system based off of SRS
https://tetris.wiki/Super_Rotation_System#How_Guideline_SRS_Really_Works
to implement: 
- full scoring system (including hard drop and t-spins)
- game over
- home screen
- DAS
*/
var level = 0;
var dropSpeedList = [48,43,38,33,28,23,18,13,8,6,5,5,5,4,4,4,3,3,3,2,2,2,2,2,2,2,2,2,2];
var dropSpeed = dropSpeedList[level];
var framesBetweenDrops = 0;
var gameBoard = [];
var gameBoardDivs = [];
var score = 0;
var pieceBag = [];
var pieceQueue = [];
var canHoldPiece = true;
var heldPiece = 0;
var notSwitchedHeldPiece = true;
var gameEnded = false;
var pieceLockTimer = 0;
var totalLinesCleared = 0;
var combo = 0;
var previousDifficultClear = false;
var killScreenOn = false;
const COLORS = ["#7F7F7F", "#00FFFF", "#0000FF", "#FF7F00", "#FFFF00", "#00FF00", "#800080", "#FF0000"];
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
  fill("#A0A0A0");
  noStroke();
  rect(201,0,200,40);
  textAlign(CENTER, CENTER);
  fill("black");
  text("score: "+score, 300, 10);
  text("level: "+level, 300, 30);
  if(!gameEnded){
    stroke("black");
    if(framesBetweenDrops >= dropSpeed){
      if(canMoveDown()){
        currentPiece.previousX = currentPiece.x;
        currentPiece.previousY = currentPiece.y;
        currentPiece.y ++;
        erasePreviousBlock(currentPiece.previousX, currentPiece.previousY, currentPiece.boundingBox);
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
    if(keyWentDown("left") && canMoveLeft()){
      currentPiece.previousX = currentPiece.x;
      currentPiece.previousY = currentPiece.y;
      currentPiece.x --;
      erasePreviousBlock(currentPiece.previousX, currentPiece.previousY, currentPiece.boundingBox);
      drawBlock(currentPiece.x, currentPiece.y, currentPiece.type, currentPiece.boundingBox);
    }
    if(keyWentDown("right") && canMoveRight()){
      currentPiece.previousX = currentPiece.x;
      currentPiece.previousY = currentPiece.y;
      currentPiece.x ++;
      erasePreviousBlock(currentPiece.previousX, currentPiece.previousY, currentPiece.boundingBox);
      drawBlock(currentPiece.x, currentPiece.y, currentPiece.type, currentPiece.boundingBox);
    }
    if(keyWentDown("space")){
      notSwitchedHeldPiece = true;
      currentPiece.previousX = currentPiece.x;
      currentPiece.previousY = currentPiece.y;
      erasePreviousBlock(currentPiece.previousX, currentPiece.previousY, currentPiece.boundingBox);
      while(canMoveDown()){
        currentPiece.y ++;
        score += 2;
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
    }
    if(keyWentDown("up")){
      if(isNotObstructed(0,0,(currentPiece.rotation+1)%4)){
        currentPiece.previousBoundingBox = currentPiece.boundingBox;
        currentPiece.rotation = (currentPiece.rotation+1)%4;
        currentPiece.boundingBox = findBoundingBox(currentPiece.type, currentPiece.rotation);
        erasePreviousBlock(currentPiece.x, currentPiece.y, currentPiece.previousBoundingBox);
        drawBlock(currentPiece.x, currentPiece.y, currentPiece.type, currentPiece.boundingBox);
      } else {
        checkWallKicks(currentPiece.rotation, (currentPiece.rotation+1)%4);
      }
    }
    if(keyWentDown("z")){
      if(isNotObstructed(0,0,(currentPiece.rotation == 0) ? 3 : currentPiece.rotation-1)){
        currentPiece.previousBoundingBox = currentPiece.boundingBox;
        currentPiece.rotation = (currentPiece.rotation == 0) ? 3 : currentPiece.rotation-1;
        currentPiece.boundingBox = findBoundingBox(currentPiece.type, currentPiece.rotation);
        erasePreviousBlock(currentPiece.x, currentPiece.y, currentPiece.previousBoundingBox);
        drawBlock(currentPiece.x, currentPiece.y, currentPiece.type, currentPiece.boundingBox);
      } else {
        checkWallKicks(currentPiece.rotation, (currentPiece.rotation == 0) ? 3 : currentPiece.rotation-1);
      }
    }
    if(keyWentDown("c") && canHoldPiece && notSwitchedHeldPiece){
      notSwitchedHeldPiece = false;
      erasePreviousBlock(currentPiece.x, currentPiece.y, currentPiece.boundingBox);
      if(heldPiece == 0){
        heldPiece = currentPiece.type;
        createNewPiece();
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
        currentPiece.boundingBox = findBoundingBox(currentPiece.type, 0);
        currentPiece.previousBoundingBox = currentPiece.boundingBox;
        drawPieceQueue();
      }
    }
  }
}

function findBoundingBox(type, rotation){
  switch(type){
    case 1:
      switch(rotation){
        case 0:
          return [[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,1],[0,0,0,0,0],[0,0,0,0,0]];
        case 1:
          return [[0,0,0,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]];
        case 2:
          return [[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,0],[0,0,0,0,0],[0,0,0,0,0]];
        case 3:
          return [[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,0,0,0]];
      }
      break;
    case 2:
      switch(rotation){
        case 0:
          return [[1,0,0],[1,1,1],[0,0,0]];
        case 1:
          return [[0,1,1],[0,1,0],[0,1,0]];
        case 2:
          return [[0,0,0],[1,1,1],[0,0,1]];
        case 3:
          return [[0,1,0],[0,1,0],[1,1,0]];
      }
      break;
    case 3:
      switch(rotation){
        case 0:
          return [[0,0,1],[1,1,1],[0,0,0]];
        case 1:
          return [[0,1,0],[0,1,0],[0,1,1]];
        case 2:
          return [[0,0,0],[1,1,1],[1,0,0]];
        case 3:
          return [[1,1,0],[0,1,0],[0,1,0]];
      }
      break;
    case 4:
      switch(rotation){
        case 0:
          return [[0,1,1],[0,1,1],[0,0,0]];
        case 1:
          return [[0,0,0],[0,1,1],[0,1,1]];
        case 2:
          return [[0,0,0],[1,1,0],[1,1,0]];
        case 3:
          return [[1,1,0],[1,1,0],[0,0,0]];
      }
      break;
    case 5:
      switch(rotation){
        case 0:
          return [[0,1,1],[1,1,0],[0,0,0]];
        case 1:
          return [[0,1,0],[0,1,1],[0,0,1]];
        case 2:
          return [[0,0,0],[0,1,1],[1,1,0]];
        case 3:
          return [[1,0,0],[1,1,0],[0,1,0]];
      }
      break;
    case 6:
      switch(rotation){
        case 0:
          return [[0,1,0],[1,1,1],[0,0,0]];
        case 1:
          return [[0,1,0],[0,1,1],[0,1,0]];
        case 2:
          return [[0,0,0],[1,1,1],[0,1,0]];
        case 3:
          return [[0,1,0],[1,1,0],[0,1,0]];
      }
      break;
    case 7:
      switch(rotation){
        case 0:
          return [[1,1,0],[0,1,1],[0,0,0]];
        case 1:
          return [[0,0,1],[0,1,1],[0,1,0]];
        case 2:
          return [[0,0,0],[1,1,0],[0,1,1]];
        case 3:
          return [[0,1,0],[1,1,0],[1,0,0]];
      }
      break;
  }
}

function generatePiece(){
  if(pieceBag.length == 0){
    for(var i = 0; i < 7; i ++){
      pieceBag.splice(randomNumber(0,pieceBag.length),0,i+1);
    }
  }
  return pieceBag.pop();
}

function createNewPiece(){
  pieceQueue.push(generatePiece());
  currentPiece.type = pieceQueue.shift();
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
  currentPiece.boundingBox = findBoundingBox(currentPiece.type, 0);
  currentPiece.previousBoundingBox = currentPiece.boundingBox;
  drawPieceQueue();
}

function drawPieceQueue(){
  textAlign(CENTER, CENTER);
  fill("#A0A0A0");
  noStroke();
  rect(201, 40, 200, 360);
  fill("black");
  if(canHoldPiece){
    text("held piece:", 300, 70);
    stroke("black");
    drawPieceQueueBlock(300, 90, heldPiece);
    noStroke();
    fill("black");
  }
  text("next:", 300, 130);
  stroke("black");
  for(var i = 0; i < pieceQueue.length; i ++){
    drawPieceQueueBlock(300, 160+i*50, pieceQueue[i]);
  }
  fill("#7F7F7F");
}

function drawPieceQueueBlock(x, y, type){
  setColor(type);
  switch(type){
    case 1:
      rect(x-40, y, 20, 20);
      rect(x-20, y, 20, 20);
      rect(x, y, 20, 20);
      rect(x+20, y, 20, 20);
      break;
    case 2:
      rect(x-30, y-10, 20, 20);
      rect(x-30, y+10, 20, 20);
      rect(x-10, y+10, 20, 20);
      rect(x+10, y+10, 20, 20);
      break;
    case 3:
      rect(x-30, y+10, 20, 20);
      rect(x-10, y+10, 20, 20);
      rect(x+10, y+10, 20, 20);
      rect(x+10, y-10, 20, 20);
      break;
    case 4:
      rect(x-20, y-10, 20, 20);
      rect(x-20, y+10, 20, 20);
      rect(x, y-10, 20, 20);
      rect(x, y+10, 20, 20);
      break;
    case 5:
      rect(x-30, y+10, 20, 20);
      rect(x-10, y+10, 20, 20);
      rect(x-10, y-10, 20, 20);
      rect(x+10, y-10, 20, 20);
      break;
    case 6:
      rect(x-30, y+10, 20, 20);
      rect(x-10, y+10, 20, 20);
      rect(x-10, y-10, 20, 20);
      rect(x+10, y+10, 20, 20);
      break;
    case 7:
      rect(x-30, y-10, 20, 20);
      rect(x-10, y-10, 20, 20);
      rect(x-10, y+10, 20, 20);
      rect(x+10, y+10, 20, 20);
      break;
  }
}

function setUpGame(){
  const body = document.getElementById("body");
  for(var k = 0; k < 5; k ++){
    pieceQueue.push(generatePiece());
  }
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
  erasePreviousBlock(currentPiece.previousX, currentPiece.previousY, currentPiece.boundingBox);
  drawBlock(currentPiece.x, currentPiece.y, currentPiece.type, currentPiece.boundingBox);
}

function erasePreviousBlock(x, y, boundingBox){
  fill("#7F7F7F");
  for(var i = 0; i < boundingBox.length; i ++){
    for(var j = 0; j < boundingBox[i].length; j ++){
      if(boundingBox[i][j]){
        rect((x+j)*20, (y+i)*20, 20, 20);
      }
    }
  }
}

function drawBlock(x, y, type, boundingBox){
  setColor(type);
  for(var i = 0; i < boundingBox.length; i ++){
    for(var j = 0; j < boundingBox[i].length; j ++){
      if(boundingBox[i][j]){
        rect((x+j)*20, (y+i)*20, 20, 20);
      }
    }
  }
}

function canMoveDown(){
  for(var i = 0; i < currentPiece.boundingBox.length; i ++){
    for(var j = 0; j < currentPiece.boundingBox[i].length; j ++){
      if(currentPiece.boundingBox[i][j]){
        if(currentPiece.y + i + 1 >= 20){
          return false;
        }
        if(gameBoard[currentPiece.y+i+1][currentPiece.x+j] !== 0){
          return false;
        }
      }
    }
  }
  return true;
}

function canMoveLeft(){
  for(var i = 0; i < currentPiece.boundingBox.length; i ++){
    for(var j = 0; j < currentPiece.boundingBox[i].length; j ++){
      if(currentPiece.boundingBox[i][j]){
        if(currentPiece.x + j - 1 < 0){
          return false;
        }
        if(gameBoard[currentPiece.y+i][currentPiece.x+j-1] !== 0){
          return false;
        }
      }
    }
  }
  return true;
}

function canMoveRight(){
  for(var i = 0; i < currentPiece.boundingBox.length; i ++){
    for(var j = 0; j < currentPiece.boundingBox[i].length; j ++){
      if(currentPiece.boundingBox[i][j]){
        if(currentPiece.x + j + 1 >= 20){
          return false;
        }
        if(gameBoard[currentPiece.y+i][currentPiece.x+j+1] !== 0){
          return false;
        }
      }
    }
  }
  return true;
}

function checkWallKicks(initialRotation, finalRotation){
  var offset1;
  var offset2;
  if(currentPiece.type !== 4){
    for(var i = 0; i < 5; i ++){
      offset1 = findOffsetData(initialRotation, i);
      offset2 = findOffsetData(finalRotation, i);
      if(isNotObstructed(offset1[0]-offset2[0],offset1[1]-offset2[1],finalRotation)){
        currentPiece.previousX = currentPiece.x;
        currentPiece.previousY = currentPiece.y;
        currentPiece.x += (offset1[0]-offset2[0]);
        currentPiece.y += (offset1[1]-offset2[1]);
        currentPiece.previousBoundingBox = currentPiece.boundingBox;
        currentPiece.rotation = finalRotation;
        currentPiece.boundingBox = findBoundingBox(currentPiece.type, currentPiece.rotation);
        erasePreviousBlock(currentPiece.previousX, currentPiece.previousY, currentPiece.previousBoundingBox);
        drawBlock(currentPiece.x, currentPiece.y, currentPiece.type, currentPiece.boundingBox);
        return;
      }
    }
  } else {
    offset1 = findOffsetData(initialRotation, 0);
    offset2 = findOffsetData(finalRotation, 0);
    if(isNotObstructed(offset1[0]-offset2[0],offset1[1]-offset2[1],finalRotation)){
      currentPiece.previousX = currentPiece.x;
      currentPiece.previousY = currentPiece.y;
      currentPiece.x += (offset1[0]-offset2[0]);
      currentPiece.y += (offset1[1]-offset2[1]);
      currentPiece.previousBoundingBox = currentPiece.boundingBox;
      currentPiece.rotation = finalRotation;
      currentPiece.boundingBox = findBoundingBox(currentPiece.type, currentPiece.rotation);
      erasePreviousBlock(currentPiece.previousX, currentPiece.previousY, currentPiece.previousBoundingBox);
      drawBlock(currentPiece.x, currentPiece.y, currentPiece.type, currentPiece.boundingBox);
      return;
    }
  }
}

function findOffsetData(rotation, offsetNumber){
  switch(currentPiece.type){
    case 1:
      switch(rotation){
        case 0:
          switch(offsetNumber){
            case 0:
              return [0,0];
            case 1:
              return [-1,0];
            case 2:
              return [2,0];
            case 3:
              return [-1,0];
            case 4:
              return [2,0];
          }
          break;
        case 1:
          switch(offsetNumber){
            case 0:
              return [-1,0];
            case 1:
              return [0,0];
            case 2:
              return [0,0];
            case 3:
              return [0,1];
            case 4:
              return [0,-2];
          }
          break;
        case 2:
          switch(offsetNumber){
            case 0:
              return [-1,1];
            case 1:
              return [1,1];
            case 2:
              return [-2,1];
            case 3:
              return [1,0];
            case 4:
              return [-2,0];
          }
          break;
        case 3:
          switch(offsetNumber){
            case 0:
              return [0,1];
            case 1:
              return [0,1];
            case 2:
              return [0,1];
            case 3:
              return [0,-1];
            case 4:
              return [0,2];
          }
          break;
      }
      break;
    case 4:
      switch(rotation){
        case 0:
          return [0,0];
        case 1:
          return [0,-1];
        case 2:
          return [-1,-1];
        case 3:
          return [-1,0];
      }
      break;
    default:
      switch(rotation){
        case 0:
          return [0,0];
        case 1:
          switch(offsetNumber){
            case 0:
              return [0,0];
            case 1:
              return [1,0];
            case 2:
              return [1,-1];
            case 3:
              return [0,2];
            case 4:
              return [1,2];
          }
          break;
        case 2:
          return [0,0];
        case 3:
          switch(offsetNumber){
            case 0:
              return [0,0];
            case 1:
              return [-1,0];
            case 2:
              return [-1,-1];
            case 3:
              return [0,2];
            case 4:
              return [-1,2];
          }
          break;
      }
      break;
  }
}

function isNotObstructed(xOffset, yOffset, rotation){
  var boundingBox = findBoundingBox(currentPiece.type, rotation);
  for(var i = 0; i < boundingBox.length; i ++){
    for(var j = 0; j < boundingBox[i].length; j ++){
      if(boundingBox[i][j]){
        if(currentPiece.x+xOffset+j < 0 || currentPiece.x+xOffset+j >= 10){
          return false;
        }
        if(currentPiece.y+yOffset+i >= 20 || currentPiece.y+yOffset+i < 0){
          return false;
        }
        if(gameBoard[currentPiece.y+yOffset+i][currentPiece.x+xOffset+j] !== 0){
          return false;
        }
      }
    }
  }
  return true;
}

function clearLines(){
  var lineClears = 0;
  for(var i = 0; i < 20; i ++){
    if(gameBoard[i].indexOf(0) == -1){
      lineClears ++;
      gameBoard.splice(i,1);
      gameBoard.unshift([0,0,0,0,0,0,0,0,0,0]);
    }
  }
  for(var k = 0; k < 20; k ++){
    for(var l = 0; l < 10; l ++){
      setColor(gameBoard[k][l]);
      rect(l*20, k*20, 20, 20);
    }
  }
  switch(lineClears){
    case 0:
      previousDifficultClear = false;
      combo = 0;
      break;
    case 1:
      score += 100*(level+1);
      previousDifficultClear = false;
      combo ++;
      break;
    case 2:
      score += 300*(level+1);
      previousDifficultClear = false;
      combo ++;
      break;
    case 3:
      score += 500*(level+1);
      previousDifficultClear = false;
      combo ++;
      break;
    case 4:
      if(previousDifficultClear){
        score += 1200*(level+1);
      } else {
        score += 800*(level+1);
      }
      previousDifficultClear = true;
      combo ++;
      break;
  }
  score += 50*combo*level;
  totalLinesCleared += lineClears;
  if(totalLinesCleared-level*10 > 10){
    totalLinesCleared -= 10;
    level ++;
    if(level < 29){
      dropSpeed = dropSpeedList[level];
    } else {
      if(killScreenOn){
        dropSpeed = 1;
      } else {
        dropSpeed = 2;
      }
    }
    if(level <= 8){
      dropSpeed -= 5;
    } else if(level == 9){
      dropSpeed -= 2;
    } else if(level == 10 || level == 13 || level == 16 || level == 19 || (killScreenOn && level == 29)){
      dropSpeed --;
    }
  }
}