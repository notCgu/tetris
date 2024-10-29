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
