let grid = [];


function resetInput(){
  for(let x = 0; x < gridWidth; x++)
    for (let y = 0; y < gridHeight; y++)
      grid[x][y] = 0;
}


const inputSketch = (sketch) => {

let inputGridWidth = gridWidth;

let inputGridHeight = gridHeight;

let tileSizeX;
let tileSizeY;

let brushSize = 3;
let brushStrength = 1;

let lastPaintedX = -1;
let lastPaintedY = -1;

sketch.setup = () => {
  sketch.createCanvas(400, 400);

  grid = Array.from({ length: inputGridWidth }, () => 
  Array.from({ length: inputGridHeight }, () => 0)
)
    
  tileSizeX = Math.floor(sketch.width / inputGridWidth);
  tileSizeY = Math.floor(sketch.height / inputGridHeight);
  
}

sketch.draw = () => {

    if (sketch.mouseIsPressed == true){
        if(mouseInsideGrid() == true){
            xIndex = Math.round(sketch.mouseX / tileSizeX);
            yIndex = Math.round(sketch.mouseY / tileSizeY);

            if(xIndex != lastPaintedX || yIndex != lastPaintedY){
            paintOnCoordinateAndSorrounding(xIndex, yIndex, brushSize, brushStrength);
            lastPaintedX = xIndex;
            lastPaintedY = yIndex;
            }
          }
    }
    else {lastPaintedX = -1;
          lastPaintedY = -1;}

  drawGrid();

}

function drawGrid(){
  
  for(let x = 0; x < inputGridWidth; x++)
    for (let y = 0; y < inputGridHeight; y++){
      sketch.fill(grid[x][y] * 255);
      sketch.rect(tileSizeX * x,tileSizeX * y, tileSizeX);
    }  
}

function paintOnCoordinateAndSorrounding(x, y, brushSize, brushStrength){

  let strengthDecreasePerTile = brushStrength / brushSize * 1.4;
  recursivePaintOnCoordinateAndSorrounding(x, y, brushStrength, strengthDecreasePerTile);
  
}

function recursivePaintOnCoordinateAndSorrounding(x, y, brushStrength, strengthDecreasePerTile, lockedCoordinates){
  if (coordinatesInsideGrid(x, y)){

    grid[x][y] += brushStrength;
    if (grid[x][y] > 1)
      grid[x][y] = 1;

    brushStrength -= strengthDecreasePerTile;

    if (brushStrength > 0){
      recursivePaintOnCoordinateAndSorrounding(x+1, y, brushStrength, strengthDecreasePerTile);
      recursivePaintOnCoordinateAndSorrounding(x-1, y, brushStrength, strengthDecreasePerTile);
      recursivePaintOnCoordinateAndSorrounding(x, y-1, brushStrength, strengthDecreasePerTile);
      recursivePaintOnCoordinateAndSorrounding(x, y+1, brushStrength, strengthDecreasePerTile);
    }
  }
}

function mouseInsideGrid(){
    let mouseXInGrid = Math.floor(sketch.mouseX / tileSizeX);
    let mouseYInGrid = Math.floor(sketch.mouseY / tileSizeY);

      if(mouseXInGrid < inputGridWidth && mouseXInGrid >= 0 && mouseYInGrid < inputGridHeight && mouseYInGrid >= 0){
        return true;
      }
  
  return false;
}

function coordinatesInsideGrid(x, y){

  if (x < inputGridWidth && x >= 0 && y < inputGridHeight && y >= 0)
    return true;
  else return false;

}


}

function fillGridWithArray(array){
  grid = array;
}