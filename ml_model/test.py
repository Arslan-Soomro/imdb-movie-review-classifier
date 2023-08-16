from tensorflow.keras.datasets import imdb
import numpy as np


word_index = imdb.get_word_index();
sorted_word_index = sorted(word_index.items(), key=lambda x: x[1], reverse=True)[:10000];

for i in range(3, len(sorted_word_index) + 3):
    sorted_word_index[i - 3] = (sorted_word_index[i - 3][0], i);

print(sorted_word_index[:10]);

'''
reverse_word_index = dict([(value, key) for (key, value) in word_index.items()]);

sorted_list = sorted(reverse_word_index.items(), key=lambda x: x[0], reverse=True);
print("Number of Words: ", len(sorted_list[:10000]));
'''