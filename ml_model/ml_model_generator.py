#%% Load the IMDB movie set
# Import Tensorflow, Keras, and IMDB movie set
from tensorflow.keras.datasets import imdb
from tensorflow import keras
from tensorflow.keras import layers
import tensorflowjs as tfjs
import json
import copy
import numpy as np

(train_data, train_labels), (test_data, test_labels) = imdb.load_data(num_words=10000);

#%% Create the word_index.json file
word_index = imdb.get_word_index();
sorted_word_frequencies = sorted(word_index.items(), key=lambda x: x[1], reverse=True)[:10000];

sorted_word_indexes = copy.deepcopy(sorted_word_frequencies);

for i in range(3, len(sorted_word_frequencies) + 3):
  sorted_word_indexes[i - 3] = (sorted_word_frequencies[i - 3][0], i);
    

data_to_write = {
    "word_frequencies": dict(sorted_word_frequencies),
    "word_indexes": dict(sorted_word_indexes),
}

# Save sorted list to file .json
with open("ml_model/model/word_index.json", "w") as f:
    json.dump(data_to_write, f, ensure_ascii=False, indent=4)

print("Created the word_index.json file!");


#%% Create the model.json file
'''
# Function that multi hot encodes the sequences
def vectorize_sequences(sequences, dimension=10000):
  results = np.zeros((len(sequences), dimension));
  for i, sequence in enumerate(sequences):
    for j in sequence:
      results[i, j] = 1
  return results

# Reviews
x_train = vectorize_sequences(train_data);
x_test = vectorize_sequences(test_data);

# Labels
y_train = np.asarray(train_labels).astype("float32");
y_test = np.asarray(test_labels).astype("float32");


# Creating and compiling the model
model = keras.Sequential([
    layers.Dense(16, activation="relu"),
    layers.Dense(16, activation="relu"),
    layers.Dense(1, activation="sigmoid")
])

model.compile(
    optimizer="rmsprop",
    loss="binary_crossentropy",
    metrics=["accuracy"]
)


# Training the model
model.fit(
    x_train,
    y_train,
    epochs=4,
    batch_size=512,
    verbose=0,
)

results = model.evaluate(x_test, y_test);

print("Resutls: ", results);

tfjs.converters.save_keras_model(model, "ml_model/model");

print("Model saved!");
'''