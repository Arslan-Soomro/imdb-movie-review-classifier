// const MODEL_URL = "https://drive.google.com/file/d/1RTKFvww4RV3h4cze7ctzE6GjqRv048ih";
// const WORD_INDEX_URL = "https://drive.google.com/file/d/1YsIRtBAqFe_vn3uUyJJbc_frh6tqG_cb";
const MODEL_URL = "/ml_model/model/model.json";
const WORD_INDEX_URL = "/ml_model/model/word_index.json";
const TOTAL_WORDS = 10000;

async function loadModel() {
  console.log("Lodaing Model");
  const model = await tf.loadLayersModel(MODEL_URL);
  return model;
}

function textToSequence(text, wordIndexes, totalWords) {
  console.log(wordIndexes);
  const sequence = Array(totalWords).fill(0);
  text.split(" ").forEach((word) => {
    console.log(word, word.toLowerCase(), wordIndexes[word.toLowerCase()]);
    const thisWordIndex = wordIndexes[word.toLowerCase()];
    console.log("wordIndex: ", thisWordIndex);
    if (thisWordIndex != null) {
      sequence[thisWordIndex] = 1;
    }
  });
  return sequence;
}

async function main() {
  console.log("main() called.");
  const lossLessJson = window["LosslessJSON"];
  const wordIndexRes = await fetch(WORD_INDEX_URL);
  const wordIndexData = await wordIndexRes.text();

  const wordIndexes = wordIndexData["word_indexes"];
  const wordFrequencies = wordIndexData["word_frequencies"];

  console.log(wordIndexData);
  console.log(JSON.parse(wordIndexData.replace(/^\uFEFF/, '')));
  // console.log(lossLessJson.parse(wordIndexData));
  // console.log(JSON.parse(wordIndexData));

  console.log("Word Index Loaded");

  // const model = await loadModel();

  // const review = "l This movie was the best movie I have ever seen.";

  // console.log("Encoded Review: ", textToSequence(review, wordIndexes, TOTAL_WORDS).filter((val) => val != 0));
}

main();

console.log("Script reLoaded!");
