
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

        showOutput(predictionOutputIndex);

        
    }

    function showOutput(outputValueIndex){

        
          outputValueText = outputNeuronLabels[outputValueIndex];
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
