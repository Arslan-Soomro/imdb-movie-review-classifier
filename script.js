const MODEL_URL = "https://drive.google.com/file/d/1RTKFvww4RV3h4cze7ctzE6GjqRv048ih";
async function loadModel() {
  const model = await tf.loadLayersModel(MODEL_URL);
  return model;
}

console.log("Script Loaded!");