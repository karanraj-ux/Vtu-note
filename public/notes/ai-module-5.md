# Module 5: Machine Learning Foundations & Applications

## Course: Introduction to Artificial Intelligence (1BAIA103)
**Module Weightage**: 20 Marks in VTU Examination

---

## 1. What is Machine Learning?

According to Arthur Samuel (1959), **Machine Learning** is the field of study that gives computers the ability to learn without being explicitly programmed.  
Tom Mitchell (1997) provided a formal engineering definition:
> *"A computer program is said to learn from experience $E$ with respect to some class of tasks $T$ and performance measure $P$, if its performance at tasks in $T$, as measured by $P$, improves with experience $E$."*

### Paradigms of Machine Learning:
1. **Supervised Learning**: The training dataset contains both inputs (features $X$) and corresponding correct labels ($Y$).
2. **Unsupervised Learning**: The dataset consists only of unlabeled feature vectors $X$. The goal is to discover latent patterns, density distributions, or groupings.
3. **Reinforcement Learning**: An autonomous agent interacts with a dynamic environment via trial and error, guided by scalar reward/penalty feedback signals.

---

## 2. Supervised Learning: Classification vs. Regression

| Characteristic | Classification | Regression |
|---|---|---|
| **Target Output ($Y$)** | Categorical / Discrete values | Continuous numerical values |
| **Example Problems** | Spam vs. Ham, Disease diagnosis, Digit recognition | House price estimation, Temperature forecasting |
| **Popular Algorithms** | Decision Trees, Naive Bayes, Logistic Regression, SVM | Linear Regression, Polynomial Regression, Ridge/Lasso |
| **Evaluation Metrics** | Accuracy, Precision, Recall, F1-Score, ROC-AUC | Mean Squared Error (MSE), Root MSE (RMSE), $R^2$ score |

---

## 3. Decision Tree Induction (ID3 Algorithm)

Decision Trees are intuitive, rule-based hierarchical models where:
- **Internal Nodes**: Tests on an attribute.
- **Branches**: Outcomes of the attribute test.
- **Leaf Nodes**: Class label predictions.

### A. Entropy (Measure of Impurity)
Given a training dataset $S$ with $c$ distinct classes:
$$\text{Entropy}(S) = -\sum_{i=1}^c p_i \log_2 (p_i)$$
where $p_i$ is the proportion of examples belonging to class $i$.
- If all samples belong to the same class: $\text{Entropy}(S) = 0$ (completely pure).
- For a balanced binary dataset ($p_1 = 0.5, p_2 = 0.5$): $\text{Entropy}(S) = 1$ (maximum impurity).

### B. Information Gain
Information Gain measures the reduction in entropy achieved by partitioning the dataset $S$ according to attribute $A$:
$$\text{Gain}(S, A) = \text{Entropy}(S) - \sum_{v \in \text{Values}(A)} \frac{|S_v|}{|S|} \text{Entropy}(S_v)$$
The ID3 algorithm selects the attribute with the **highest Information Gain** at each node.

### C. Overfitting and Pruning
- **Overfitting**: When a model memorizes random noise in the training set and performs poorly on unseen test data.
- **Remedy**:
  1. **Pre-pruning**: Halt tree growth early based on depth limit or minimum sample split.
  2. **Post-pruning**: Grow full tree, then prune branches that do not improve validation set accuracy.

---

## 4. Artificial Neural Networks & The Perceptron

### A. The Rosenblatt Perceptron
The simplest model of a biological neuron:
$$y = f\left(\sum_{i=1}^n w_i x_i + b\right) = f(W^T X + b)$$
where:
- $X = [x_1, x_2, \dots, x_n]^T$ is the input vector.
- $W = [w_1, w_2, \dots, w_n]^T$ is the weight vector.
- $b$ is the bias term.
- $f(\cdot)$ is an activation function (e.g., Step, Sigmoid, ReLU, Tanh).

### B. The Linearity Limit (Minsky & Papert, 1969)
A single-layer perceptron can only learn **linearly separable** functions (like AND, OR). It **cannot solve the XOR problem**.  
To solve non-linear problems, **Multilayer Perceptrons (MLPs)** with non-linear activation functions and the **Backpropagation Algorithm** are required.

---

## 5. Major Modern AI Application Domains

1. **Natural Language Processing (NLP)**:
   - Sentiment analysis, machine translation, large language models (LLMs), automated speech recognition.
2. **Computer Vision (CV)**:
   - Object detection (YOLO), facial recognition, autonomous driving, medical scan segmentation.
3. **Robotics & Autonomous Systems**:
   - Simultaneous Localization and Mapping (SLAM), path planning, robotic surgery.

---

## 6. AI Ethics, Bias & Governance

As AI systems impact society, critical ethical considerations must be addressed:
- **Fairness & Bias**: Preventing models from perpetuating historical human discrimination in hiring, credit scoring, or criminal justice.
- **Explainability (XAI)**: Ensuring decisions made by complex neural networks can be understood and audited by domain experts.
- **Safety & Alignment**: Ensuring agent objectives remain beneficial and aligned with human values.
- **Privacy & Security**: Protecting training data against model extraction and adversarial attacks.
