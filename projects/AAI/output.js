
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

        if (predictionOutput != null)
            predictionOutput.array().then(res=>  predictedNumber = IndexOfMaxValue(res[0]));
        //print(predictedNumber);

        showOutput(predictionOutput);
    }

    function showOutput(predictionOutput){

        if (predictionOutput != null){
          outputValueText = outputNeuronLabels[predictedNumber];
          sketch.textSize(244);
          sketch.text(outputValueText, (sketch.width/2), (sketch.height/2));
        }
        else {
          outputValueText = "Not identified!"
          sketch.textSize(48);
          sketch.text(outputValueText, (sketch.width/2), (sketch.height/2));
        }
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
