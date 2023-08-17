const MODEL_URL = "/ml_model/model/model.json";
const WORD_INDEX_URL = "/ml_model/model/word_index.json";
const TOTAL_WORDS = 10000;

async function loadModel() {
  console.log("Lodaing Model");
  const model = await tf.loadLayersModel(MODEL_URL);
  return model;
}

function textToSequence(text, words, noTotalWords) {
  const tokens = text.toLowerCase().split(" ");
  const sequence = Array(noTotalWords).fill(0);

  // console.log("Tokens: ", tokens);
  // console.log("Words: ", words);

  // Get All the indexes of the tokens with respect to frequency
  const tokenIndexes = [];
  for (let i = 0; i < tokens.length; i++) {
    let index = words.findIndex((word) => {
      // console.log(word, tokens[i]);
      return word === tokens[i];
    });
    if (index != -1) {
      // Indexes are shifted by 3, because 0, 1, 2 are reserved for padding, start and unknown
      // tokenIndexes.push(index + 3);
        tokenIndexes.push(index);
    }
  }

  // Set the indexes to 1 in the sequence
  tokenIndexes.forEach((index, i) => {
    sequence[index] = 1;
  });

  return sequence;
}

async function main() {
  console.log("main() called.");

  const wordIndexRes = await fetch(WORD_INDEX_URL);
  const sortedWords = await wordIndexRes.json();

  console.log("Word Index Loaded");

  const model = await loadModel();

  console.log("Model Loaded");
  // model.summary();

  const review = "Wonderful movie!";
  const sequence = trainData;// textToSequence(review, sortedWords, TOTAL_WORDS);
  console.log("sequence", trainData);

  // Convert the sequence to a tensor of shape [[null,10000]]
  const input = tf.tensor2d([sequence], [1, TOTAL_WORDS]);
  console.log("Input: ", input.shape, input, input.dataSync());

  // Predict the output
  const prediction = model.predict(input);
  // console.log("Output: ", prediction.shape, prediction);
  // console.log("Prediction: ", prediction.dataSync()[0]);

  // Save prediction value into a variable
  const predictionValue = prediction.dataSync()[0];

  console.log(`${predictionValue > 0.5 ? "Positive" : "Negative"} -> ${review}`, predictionValue);

}

main();

console.log("Script reLoaded!");
