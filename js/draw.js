function drawPieceQueue(){
  if(canHoldPiece){
    text("held piece:", 300, 70);
    stroke("black");
    drawPieceQueueBlock(300, 90, heldPiece);
    noStroke();
    fill("black");
  }
  text("next:", 300, 130);
  stroke("black");
  for(let i = pieceQueueDivs.length; i < pieceQueue.length; i ++){
    drawPieceQueueBlock(300, 160+i*50, pieceQueue[i]);
  }
}

function drawPieceQueueBlock(x, y, type){
  const head = document.getElementById("head");
  switch(type){
    case 1:
      pieceQueueDivs.push([]);
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

function drawBlock(x, y, type, boundingBox){
  for(var i = 0; i < boundingBox.length; i ++){
    for(var j = 0; j < boundingBox[i].length; j ++){
      if(boundingBox[i][j]){
        gameBoardDivs[y+i][x+j].style.backgroundColor = COLORS[type];
      }
    }
  }
}
