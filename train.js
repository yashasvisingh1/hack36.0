import {TRAINING_DATA} from 'fer2013/fer.js';

function normalize(tensor, min, max){
    const result = tf.tidy(function(){
        const MIN_VALUES = tf.scalar(min);
        const MAX_VALUES = tf.scalar(max);

        const TENSOR_SUBSTRACT_MIN_VALUES = tf.sub(tensor, min);
        const RANGE_SIZE = tf.sub(MAX_VALUES, MIN_VALUES);
        const NORMALIZED_VALUES = tf.div(TENSOR_SUBSTRACT_MIN_VALUES, RANGE_SIZE);

        return NORMALIZED_VALUES;
    });

    return result;
}

// Since the INPUT array is 2D, it is passed in tensor2d;
const INPUTS_TENSOR = normalize(tf.tensor2d(INPUTS), 0, 255);

const LOOKUP = [ "angry", "disgust", "fear", "happy", "neutral", "sad", "surprise" ];

async function train(){
    model.compile({
        optimizer: 'adam', // Adam optimizer changes the learning rate over time which is very useful
        loss: 'categoricalCrossEntropy', //As this is a classification problem
        metrics: ['accuracy']
    });

    const RESHAPED_INPUTS = INPUTS_TENSOR.reshape([INPUTS.length, 28, 28, 1]);
    // INPUTS.length represents batch size, the other 3 are x, y and no of color channels count
    // Since we are using Gray image, there is a single channel

    let results = await model.fit(RESHAPED_INPUTS, OUTPUTS_TENSOR, {
        shuffle: true,    // Ensure data is shuffled again before using each time.
        validationSplit: 0.15, // 15% data is used for validation
        epochs: 30,   // Number of iterations to go through the data
        batchSize: 256, // Can be changed!
        callbacks: {onEpochEnd: logProgress}
    });

    RESHAPED_INPUTS.dispose();
    OUTPUTS_TENSOR.dispose();
    INPUTS_TENSOR.dispose();
    evaluate();
}


function evaluate(){
    const OFFSET = MATH.floor((Math.random()*INPUTS.length));

    let answer = tf.tidy(function(){
        let newInput = normalize(tf.tensor1d(INPUTS[OFFSET]), 0, 255);
        let output = model.predict(newInput.reshape([1, 28, 28, 1]));
        output.print();

        return output.squeeze().argMax();
    });

    answer.array().then(function(index){
        PREDICTION_ELEMENT.innerText = LOOKUP[index];
        PREDICTION_ELEMENT.setAttribute('class', (index === OUTPUST[OFFSET]) ? 'correct' : 'wrong');

        answer.dispose();
        drawImage(INPUTS[OFFSET]); 
    })
}


train();