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
