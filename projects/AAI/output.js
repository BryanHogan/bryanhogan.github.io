
let predictedNumber = 0;


const outputSketch = (sketch) => {


    let outputValueText = "Not Identified";

    sketch.setup = () => {

        sketch.createCanvas(400, 400);
    }

    sketch.draw = () => {

        sketch.fill(255);
        sketch.stroke(0);
        sketch.strokeWeight(5);
        sketch.rect(0, 0, 400, 400);
        sketch.fill(0);
        sketch.textAlign(CENTER,CENTER);

        let predictedIndex = tf.tidy(() => {
         return predictionOutput.argMax(1).dataSync();})

        predictedNumber=predictedIndex[0];
        showOutput(predictedNumber);

        
        predictionOutput.dispose();
    }

    function showOutput(outputValue){

        
          outputValueText = outputNeuronLabels[outputValue];
          sketch.textSize(244);
          sketch.text(outputValueText, (sketch.width/2), (sketch.height/2));
     
    }

    function IndexOfMaxValue(array){

        let maxValueReturn = 0.0000000000;
        let index;
        for(let i = 0; i < array.length; i++){
           if(array[i] > maxValueReturn){
               maxValueReturn = array[i];
               index = i;
           }
        }
       return index;
    };
}
