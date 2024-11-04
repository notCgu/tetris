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
  pieceQueueDivs.push([document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div")]);
  switch(type){
    case 1:
      pieceQueueDivs[pieceQueueDivs.length-1][0].style.marginLeft = 260;
      pieceQueueDivs[pieceQueueDivs.length-1][1].style.marginLeft = 280;
      pieceQueueDivs[pieceQueueDivs.length-1][2].style.marginLeft = 300;
      pieceQueueDivs[pieceQueueDivs.length-1][3].style.marginLeft = 320;
      for(let i = 0; i < 4; i ++){
        pieceQueueDivs[pieceQueueDivs.length-1][i].style.marginTop = 360;
      }
      break;
    case 2:
      pieceQueueDivs[pieceQueueDivs.length-1][0].style.marginLeft = 270;
      pieceQueueDivs[pieceQueueDivs.length-1][0].style.marginTop = 290;
      pieceQueueDivs[pieceQueueDivs.length-1][1].style.marginLeft = 270;
      pieceQueueDivs[pieceQueueDivs.length-1][1].style.marginTop = 310;
      pieceQueueDivs[pieceQueueDivs.length-1][2].style.marginLeft = 290;
      pieceQueueDivs[pieceQueueDivs.length-1][2].style.marginTop = 310;
      pieceQueueDivs[pieceQueueDivs.length-1][3].style.marginLeft = 310;
      pieceQueueDivs[pieceQueueDivs.length-1][3].style.marginTop = 310;
      break;
    case 3:
      pieceQueueDivs[pieceQueueDivs.length-1][0].style.marginLeft = 270;
      pieceQueueDivs[pieceQueueDivs.length-1][0].style.marginTop = 310;
      pieceQueueDivs[pieceQueueDivs.length-1][1].style.marginLeft = 290;
      pieceQueueDivs[pieceQueueDivs.length-1][1].style.marginTop = 310;
      pieceQueueDivs[pieceQueueDivs.length-1][2].style.marginLeft = 310;
      pieceQueueDivs[pieceQueueDivs.length-1][2].style.marginTop = 310;
      pieceQueueDivs[pieceQueueDivs.length-1][3].style.marginLeft = 310;
      pieceQueueDivs[pieceQueueDivs.length-1][3].style.marginTop = 290;
      break;
    case 4:
      pieceQueueDivs[pieceQueueDivs.length-1][0].style.marginLeft = 280;
      pieceQueueDivs[pieceQueueDivs.length-1][0].style.marginTop = 290;
      pieceQueueDivs[pieceQueueDivs.length-1][1].style.marginLeft = 280;
      pieceQueueDivs[pieceQueueDivs.length-1][1].style.marginTop = 310;
      pieceQueueDivs[pieceQueueDivs.length-1][2].style.marginLeft = 300;
      pieceQueueDivs[pieceQueueDivs.length-1][2].style.marginTop = 290;
      pieceQueueDivs[pieceQueueDivs.length-1][3].style.marginLeft = 300;
      pieceQueueDivs[pieceQueueDivs.length-1][3].style.marginTop = 310;
      break;
    case 5:
      pieceQueueDivs[pieceQueueDivs.length-1][0].style.marginLeft = 270;
      pieceQueueDivs[pieceQueueDivs.length-1][0].style.marginTop = 310;
      pieceQueueDivs[pieceQueueDivs.length-1][1].style.marginLeft = 290;
      pieceQueueDivs[pieceQueueDivs.length-1][1].style.marginTop = 310;
      pieceQueueDivs[pieceQueueDivs.length-1][2].style.marginLeft = 290;
      pieceQueueDivs[pieceQueueDivs.length-1][2].style.marginTop = 290;
      pieceQueueDivs[pieceQueueDivs.length-1][3].style.marginLeft = 310;
      pieceQueueDivs[pieceQueueDivs.length-1][3].style.marginTop = 290;
      break;
    case 6:
      pieceQueueDivs[pieceQueueDivs.length-1][0].style.marginLeft = 270;
      pieceQueueDivs[pieceQueueDivs.length-1][0].style.marginTop = 310;
      pieceQueueDivs[pieceQueueDivs.length-1][1].style.marginLeft = 290;
      pieceQueueDivs[pieceQueueDivs.length-1][1].style.marginTop = 310;
      pieceQueueDivs[pieceQueueDivs.length-1][2].style.marginLeft = 290;
      pieceQueueDivs[pieceQueueDivs.length-1][2].style.marginTop = 290;
      pieceQueueDivs[pieceQueueDivs.length-1][3].style.marginLeft = 310;
      pieceQueueDivs[pieceQueueDivs.length-1][3].style.marginTop = 310;
      break;
    case 7:
      pieceQueueDivs[pieceQueueDivs.length-1][0].style.marginLeft = 270;
      pieceQueueDivs[pieceQueueDivs.length-1][0].style.marginTop = 290;
      pieceQueueDivs[pieceQueueDivs.length-1][1].style.marginLeft = 290;
      pieceQueueDivs[pieceQueueDivs.length-1][1].style.marginTop = 290;
      pieceQueueDivs[pieceQueueDivs.length-1][2].style.marginLeft = 290;
      pieceQueueDivs[pieceQueueDivs.length-1][2].style.marginTop = 310;
      pieceQueueDivs[pieceQueueDivs.length-1][3].style.marginLeft = 310;
      pieceQueueDivs[pieceQueueDivs.length-1][3].style.marginTop = 310;
      break;
  }
  for(let i = 0; i < 4; i ++){
    pieceQueueDivs[pieceQueueDivs.length-1][i].style.color = COLORS[type];
    head.appendChild(pieceQueueDivs[pieceQueueDivs.length-1][i]);
  }
}

function shiftPieceQueue(){
  
  for(let i = 0; i 
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
