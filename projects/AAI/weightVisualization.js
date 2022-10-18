const weightVisualizationSketch = (sketch) => {


  let outputToVisualize = 0;

  let brightness = 400;
  let weightGrid;

  let weightGridWidth = gridWidth;
  let weightGridHeight = gridHeight;

  let weightGridtileSizeX;
  let weightGridtileSizeY;

    sketch.setup = () =>  {
      sketch.createCanvas(400, 400);

      weightGridtileSizeX = Math.floor(sketch.width / weightGridWidth);
      weightGridtileSizeY = Math.floor(sketch.height / weightGridHeight);

      weightGrid = Array.from({ length: 28 }, () => 
      Array.from({ length: 28}));
      //drawGrid();

        //faubel();

    }

    sketch.draw = () =>  {

      outputToVisualize = predictedNumber;
      getWeightsOfOutputUnitIntoWeightGrid();
      let rotatedAndMirroredgrid = rotateAndMirrorArray(weightGrid);
      drawGrid(rotatedAndMirroredgrid, weightGridtileSizeX);
    }

    function getWeightsOfOutputUnitIntoWeightGrid(){

      tf.tidy(() => {
      for (let i = 0; i < model.getWeights().length; i++) {
        let weightTensor = model.getWeights()[i];
        //normalize by the global max value
        weightTensor = weightTensor.div(weightTensor.max());
        //get tensordata as linear array
        let weightArray = weightTensor.dataSync();
        //weightTensor.dispose();
        let weigthsOfOutputUnit = [];

        for (let i = outputToVisualize; i < weightArray.length; i += outputUnits){
          //if (i % outputToVisualize == 0){
            weigthsOfOutputUnit.push(weightArray[i]);
          
        }

        for(let x = 0; x < weightGridWidth; x++)
          for(let y = 0; y < weightGridHeight; y++){
            weightGrid[x][y] = weigthsOfOutputUnit[y + x * weightGridHeight];
          }

      }

  })

  }

    function drawGrid(array, tileSize){
      for(let x = 0; x < array.length; x++)
        for (let y = 0; y < array[0].length; y++){
          sketch.fill(array[x][y] * brightness);
          sketch.rect(tileSize * x,tileSize * y, tileSize);
        }  
    }

    function rotateAndMirrorArray(array){
      let rotatedArray = rotate2DArray(array);
      let mirroredArray = mirro2DArray(rotatedArray);
      return mirroredArray;
    }

    function faubel(){
      for (let i = 0; i < model.getWeights().length; i++) {
        weightTensor = model.getWeights()[i];
        //normalize by the global max value
        weightTensor = weightTensor.div(weightTensor.max());
        //get tensordata as linear array
        w = weightTensor.dataSync();
        let column_ctr = 0;
        let image_ctr = 0;
        line_ctr_per_image = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        column_ctr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        max = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        //find maxima for each image in order to normalize the image
        for (let k = 0; k < w.length; k++) {
          image_ctr = k % 10;
          if (max[image_ctr] > w[k]) {
            max[image_ctr] = w[k];
          }
        }
        //cycle through all weights 7840
        for (let k = 0; k < w.length; k++) {
          //in the weightvector the data is ordered along the number of labels
          // image_ctr tells us to which image we are actually looking
          image_ctr = k % 10;
          if (max[image_ctr] > w[k]) {
            max[image_ctr] = w[k];
          }
          //draw image image_ctr
          line_ctr = line_ctr_per_image[image_ctr] % 28;
          line_ctr_per_image[image_ctr]++;
          stroke(0);
          if (line_ctr == 0) {
            column_ctr[image_ctr]++;
          }
          noStroke();
          fill(200 * (w[k] / max[image_ctr]));
          rect(image_ctr * 3 * 29 + 6 + line_ctr * 3, column_ctr[image_ctr] * 3, 3, 3);
        }
    }
    }
}