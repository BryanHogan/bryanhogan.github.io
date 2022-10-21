let model;
let layer;
let trainingDone=false;
let userInputLabel;
let amountOfTestData = 15;
let trainingDataAmount = 40000;
let predictionOutputIndex;

let reloaded = false;

let outputUnits = 36;

let outputNeuronLabels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P','Q','R','S','T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function setup()
{

  model = tf.sequential();
  layer = tf.layers.dense({units: outputUnits, inputShape: [784], activation: 'sigmoid', useBias: false});

  model.add(layer);

  model.compile({optimizer: tf.train.sgd(5), loss: 'meanSquaredError'});

  //train our model
  print("load Data");
  mnist_data=new MnistData();
  mnist_data.load(trainingDataAmount,amountOfTestData).then(res=> training());

}

function draw(){
  manualTesting();
  console.log(tf.memory().numBytesInGPU);
  if (tf.memory().numBytesInGPU > 139000000 && reloaded == false){
    reloaded = true;
      window.location.reload(true);
  }


}

function training()
{
  [x,y]=mnist_data.getTrainData();
  x=x.reshape([trainingDataAmount,784]);

  const emptyOutputUnitsExtension = tf.zeros([trainingDataAmount, outputUnits - N_CLASSES]);
  const axis = 1;
  y = tf.concat([y, emptyOutputUnitsExtension], axis);


  model.fit(x, y,{batchsize: 1, epochs: 1});//.then(res=>automatedTesting());
  console.log("traing done");
  trainingDone=true;
}

function manualTraining(){

  let userInputLabelIndex = -1;

  for(let i = 0; i < outputUnits; i++){

    if (userInputLabel.toUpperCase() == outputNeuronLabels[i]){
      userInputLabelIndex = i;
    }
  }

  if (userInputLabelIndex == -1){
    console.log("please insert label to textbox to train Ai");
    return;
  }

  let rotatedGrid = rotate2DArray(grid);

  let mirroredGrid = mirro2DArray(rotatedGrid);

  let input = tf.tensor(mirroredGrid);

  input = input.reshape([1, 784]);

  let solutionAsArray = [];

  for (let i = 0; i < outputUnits; i++){
    solutionAsArray[i] = 0;

    if (i == userInputLabelIndex)
    solutionAsArray[i] = 1;

  }

  let solutionAsTensor = tf.tensor(solutionAsArray);
  const axis = 0;
  solutionAsTensor = solutionAsTensor.expandDims(axis);

  model.fit(input, solutionAsTensor,{batchsize: 1, epochs: 10});
}

async function automatedTesting()
{
  [xtest,ytest]=mnist_data.getTestData(amountOfTestData); 

  xtest = xtest.reshape([amountOfTestData, 784]);


  model.predict(xtest).print(true);
  ytest.print();
}

function manualTesting(){    
  
    //print(userInputLabel);

    let rotatedGrid = rotate2DArray(grid);

    let mirroredGrid = mirro2DArray(rotatedGrid);

    predictionOutputIndex = tf.tidy(() => {
    let input = tf.tensor(mirroredGrid);

    input = input.reshape([1, 784]);
  
    return model.predict(input).argMax(1).dataSync()[0];
    })
}

function rotate2DArray(array){

  let rotatedArray = [];

  for(let i = array.length -1; i >= 0; i--){
  let counter = 0;
  array[i].forEach(element => {

    if (rotatedArray.length <= counter)
      rotatedArray.push([]);

    rotatedArray[counter].push(element);
    counter += 1;
  });
}

  return rotatedArray;

}

function mirro2DArray(array){
   
  let mirroredArray = [];
  let indexCounter = 0;

  for (let y = 0; y < array.length; y++){
    mirroredArray.push([]);
    for (let x = 0; x < array[0].length; x++){
      indexCounter = (array[0].length - 1) - x;
      mirroredArray[y][indexCounter] = array[y][x];
    }
  }

  return mirroredArray;

}