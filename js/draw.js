function drawPieceQueue(){
  for(let i = 0; i < pieceQueue.length; i ++){
    shiftPieceQueue();
    drawPieceQueueBlock(pieceQueue[i]);
  }
}

function drawPieceQueueBlock(type){
  const head = document.getElementById("head");
  pieceQueueDivs.push([document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div")]);
  switch(type){
    case 1:
      pieceQueueDivs[pieceQueueDivs.length-1][0].style.marginLeft = "260px";
      pieceQueueDivs[pieceQueueDivs.length-1][1].style.marginLeft = "280px";
      pieceQueueDivs[pieceQueueDivs.length-1][2].style.marginLeft = "300px";
      pieceQueueDivs[pieceQueueDivs.length-1][3].style.marginLeft = "320px";
      for(let i = 0; i < 4; i ++){
        pieceQueueDivs[pieceQueueDivs.length-1][i].style.marginTop = "360px";
      }
      break;
    case 2:
      pieceQueueDivs[pieceQueueDivs.length-1][0].style.marginLeft = "270px";
      pieceQueueDivs[pieceQueueDivs.length-1][0].style.marginTop = "290px";
      pieceQueueDivs[pieceQueueDivs.length-1][1].style.marginLeft = "270px";
      pieceQueueDivs[pieceQueueDivs.length-1][1].style.marginTop = "310px";
      pieceQueueDivs[pieceQueueDivs.length-1][2].style.marginLeft = "290px";
      pieceQueueDivs[pieceQueueDivs.length-1][2].style.marginTop = "310px";
      pieceQueueDivs[pieceQueueDivs.length-1][3].style.marginLeft = "310px";
      pieceQueueDivs[pieceQueueDivs.length-1][3].style.marginTop = "310px";
      break;
    case 3:
      pieceQueueDivs[pieceQueueDivs.length-1][0].style.marginLeft = "270px";
      pieceQueueDivs[pieceQueueDivs.length-1][0].style.marginTop = "310px";
      pieceQueueDivs[pieceQueueDivs.length-1][1].style.marginLeft = "290px";
      pieceQueueDivs[pieceQueueDivs.length-1][1].style.marginTop = "310px";
      pieceQueueDivs[pieceQueueDivs.length-1][2].style.marginLeft = "310px";
      pieceQueueDivs[pieceQueueDivs.length-1][2].style.marginTop = "310px";
      pieceQueueDivs[pieceQueueDivs.length-1][3].style.marginLeft = "310px";
      pieceQueueDivs[pieceQueueDivs.length-1][3].style.marginTop = "290px";
      break;
    case 4:
      pieceQueueDivs[pieceQueueDivs.length-1][0].style.marginLeft = "280px";
      pieceQueueDivs[pieceQueueDivs.length-1][0].style.marginTop = "290px";
      pieceQueueDivs[pieceQueueDivs.length-1][1].style.marginLeft = "280px";
      pieceQueueDivs[pieceQueueDivs.length-1][1].style.marginTop = "310px";
      pieceQueueDivs[pieceQueueDivs.length-1][2].style.marginLeft = "300px";
      pieceQueueDivs[pieceQueueDivs.length-1][2].style.marginTop = "290px";
      pieceQueueDivs[pieceQueueDivs.length-1][3].style.marginLeft = "300px";
      pieceQueueDivs[pieceQueueDivs.length-1][3].style.marginTop = "310px";
      break;
    case 5:
      pieceQueueDivs[pieceQueueDivs.length-1][0].style.marginLeft = "270px";
      pieceQueueDivs[pieceQueueDivs.length-1][0].style.marginTop = "310px";
      pieceQueueDivs[pieceQueueDivs.length-1][1].style.marginLeft = "290px";
      pieceQueueDivs[pieceQueueDivs.length-1][1].style.marginTop = "310px";
      pieceQueueDivs[pieceQueueDivs.length-1][2].style.marginLeft = "290px";
      pieceQueueDivs[pieceQueueDivs.length-1][2].style.marginTop = "290px";
      pieceQueueDivs[pieceQueueDivs.length-1][3].style.marginLeft = "310px";
      pieceQueueDivs[pieceQueueDivs.length-1][3].style.marginTop = "290px";
      break;
    case 6:
      pieceQueueDivs[pieceQueueDivs.length-1][0].style.marginLeft = "270px";
      pieceQueueDivs[pieceQueueDivs.length-1][0].style.marginTop = "310px";
      pieceQueueDivs[pieceQueueDivs.length-1][1].style.marginLeft = "290px";
      pieceQueueDivs[pieceQueueDivs.length-1][1].style.marginTop = "310px";
      pieceQueueDivs[pieceQueueDivs.length-1][2].style.marginLeft = "290px";
      pieceQueueDivs[pieceQueueDivs.length-1][2].style.marginTop = "290px";
      pieceQueueDivs[pieceQueueDivs.length-1][3].style.marginLeft = "310px";
      pieceQueueDivs[pieceQueueDivs.length-1][3].style.marginTop = "310px";
      break;
    case 7:
      pieceQueueDivs[pieceQueueDivs.length-1][0].style.marginLeft = "270px";
      pieceQueueDivs[pieceQueueDivs.length-1][0].style.marginTop = "290px";
      pieceQueueDivs[pieceQueueDivs.length-1][1].style.marginLeft = "290px";
      pieceQueueDivs[pieceQueueDivs.length-1][1].style.marginTop = "290px";
      pieceQueueDivs[pieceQueueDivs.length-1][2].style.marginLeft = "290px";
      pieceQueueDivs[pieceQueueDivs.length-1][2].style.marginTop = "310px";
      pieceQueueDivs[pieceQueueDivs.length-1][3].style.marginLeft = "310px";
      pieceQueueDivs[pieceQueueDivs.length-1][3].style.marginTop = "310px";
      break;
  }
  for(let i = 0; i < 4; i ++){
    pieceQueueDivs[pieceQueueDivs.length-1][i].style.backgroundColor = COLORS[type];
    head.appendChild(pieceQueueDivs[pieceQueueDivs.length-1][i]);
  }
}

function shiftPieceQueue(){
  for(let i = 0; i < pieceQueueDivs.length; i ++){
    for(let j = 0; j < 4; j ++){
      pieceQueueDivs[i][j].style.marginTop = (Number(pieceQueueDivs[i][j].style.marginTop.substring(0, pieceQueueDivs[i][j].style.marginTop.length-2))-50)+"px";
    }
  }
  if(pieceQueueDivs.length == 5){
    for(let i = 0; i < 4; i ++){
      pieceQueueDivs[0][i].remove();
    }
    pieceQueueDivs.shift();
    return pieceQueue.shift();
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
