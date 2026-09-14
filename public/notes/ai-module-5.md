# Module 5: Machine Learning

## 1. What is Machine Learning?

Machine Learning (ML) is a subset of AI that focuses on building systems that learn—or improve performance—based on the data they consume. Instead of explicitly programming the rules, we provide data and the algorithm finds the rules.

## 2. Types of Machine Learning

### A. Supervised Learning
*   **Concept:** The algorithm learns from labeled training data. The data includes both the input features and the correct output (target).
*   **Tasks:**
    *   **Classification:** Predicting a discrete category (e.g., spam vs. not spam, identifying a digit from an image).
    *   **Regression:** Predicting a continuous numerical value (e.g., predicting house prices, forecasting stock values).
*   **Common Algorithms:** Linear Regression, Logistic Regression, Decision Trees, Support Vector Machines (SVM).

### B. Unsupervised Learning
*   **Concept:** The algorithm is given unlabeled data and must find hidden structures, patterns, or groupings within it.
*   **Tasks:**
    *   **Clustering:** Grouping similar data points together (e.g., customer segmentation).
    *   **Dimensionality Reduction:** Compressing data while keeping the important features (e.g., PCA).
*   **Common Algorithms:** K-Means Clustering, Hierarchical Clustering.

### C. Reinforcement Learning
*   **Concept:** An agent learns to make decisions by performing actions in an environment and receiving rewards or penalties. It aims to maximize long-term cumulative reward.
*   **Analogy:** Training a dog with treats.
*   **Applications:** Robotics, playing games (Chess, Go), autonomous driving.

## 3. Artificial Neural Networks (ANNs)

Inspired by the biological brain, ANNs are the foundation of Deep Learning.

*   **Neurons (Perceptrons):** The basic unit. It takes inputs, multiplies them by weights, adds a bias, passes the sum through an activation function, and produces an output.
*   **Layers:**
    *   **Input Layer:** Receives the raw data.
    *   **Hidden Layers:** Intermediate layers where the computation and feature extraction happen.
    *   **Output Layer:** Produces the final prediction.
*   **Training (Backpropagation):** The network makes a prediction, calculates the error (loss), and then propagates this error backwards through the network to adjust the weights, minimizing the error over time.

## 4. Evaluation Metrics

How do we know if our ML model is good?

*   **Accuracy:** Percentage of correct predictions (overall).
*   **Precision:** Out of all the positive predictions, how many were actually positive? (Minimizes False Positives).
*   **Recall (Sensitivity):** Out of all actual positives, how many did we identify? (Minimizes False Negatives).
*   **F1-Score:** The harmonic mean of Precision and Recall.
*   **Overfitting:** When a model memorizes the training data perfectly but fails to generalize to new, unseen data. (Fixed by regularization, more data, or simpler models).
