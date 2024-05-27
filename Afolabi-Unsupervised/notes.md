# Unsupervised Models for Toxic Comments

## Approach
```
Clean data -> Vector encoding -> Dimension reduction -> Unsupervised clustering
```
### Cleaning

The dataset needs cleaning. Stop words, punctuation should be removed and Lemmatisation performed. The message can be made lower case but the number of capital words should be retained as a feature.

### Vector Encoding

Next I need to worry about encoding. Converting the text to a matrix needs to happen and for that the two most popular approaches are: 
```
> Count vectorizer /  Bag of n-grams
> TF-IDF (Term frequency - Inverse document Frequency)
```

### Dimensionality Reduction

Due to the large size of potential features for the given dataset, dimension reduction will need to play a significant role. For this we could use the basic SVD and PCA learned in class but since our feature size is really large, alternatives should be considered or extensions need to be applied to the reduction techniques. 

We instead select:
```
> Truncated Single Vector Decomposition (T-SVD)
> Self Organizing Maps (SOM)
```

> Note: PCA was not selected because both [3] and [4] demonstrated trouble reducing the features based on this approach. This makes sense as features in the chosen embeddings tend to represent individual words or groups of words and using only a few of those (which will be sparse across all documents) to perform clustering would be difficult

- Truncated SVD was selected due to the ability to select the number of components based on the recovered variance.
- SOMs are being considered for their ability to reduce and visualize data from a high dimensionality to a 2 dimensional space in clusters

### Unsupervised Clustering

- K-means
- Density-Based Scanning


### References and Reading
1. [Stanford article using RNN and GRU](https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1184/reports/6856482.pdf)
2. [ArXiV post from Jalpaiguri College](https://arxiv.org/ftp/arxiv/papers/1903/1903.06765.pdf)
3. [Prev CS7641 group on this topic](https://tylersmith-1234.github.io/pages/toxic-classification.html)
4. [Undergrad Udacity student on medium](https://medium.com/@nupurbaghel/toxic-comment-classification-f6e075c3487a)
5. [Science Direct paper on dimensionality reduction for NLP](https://www.sciencedirect.com/science/article/pii/S2667096822000052#:~:text=Dimensionality%20reduction%20refers%20to%20techniques,improve%20the%20learning%20algorithm's%20efficiency.)
6. [Article walking through a SOM implementation](https://towardsdatascience.com/understanding-self-organising-map-neural-network-with-python-code-7a77f501e985)