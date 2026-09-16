# Module 4: Reasoning under Uncertainty & Probabilistic Reasoning

## Course: Introduction to Artificial Intelligence (1BAIA103)
**Module Weightage**: 20 Marks in VTU Examination

---

## 1. Handling Uncertainty in Real-World AI

In classical logic, an assertion is either strictly True or strictly False. However, realistic agents operate in uncertain environments due to:
- **Partial Observability**: Sensors cannot perceive the entire global state.
- **Non-Determinism**: Actions have stochastic or unpredictable effects.
- **Noisy Perceptions**: Sensors are subject to physical errors and noise.
- **Incomplete Knowledge**: The computational cost of representing every exception is prohibitive.

To represent degrees of belief and make rational decisions under risk, AI relies on **Probability Theory** and **Decision Theory**.

---

## 2. Basic Probability Axioms & Formulations

### A. Random Variables
- **Boolean Random Variables**: Takes values from $\{\text{true}, \text{false}\}$ (e.g., $\text{Cavity}, \text{Rain}$).
- **Discrete Random Variables**: Takes values from a finite or countably infinite domain (e.g., $\text{Weather} \in \{\text{Sunny}, \text{Rainy}, \text{Cloudy}\}$).
- **Continuous Random Variables**: Takes real values within an interval (e.g., $\text{Temperature} \in \mathbb{R}$).

### B. Prior (Unconditional) vs. Posterior (Conditional) Probability
- **Prior Probability $P(A)$**: Degree of belief assigned to event $A$ in the absence of any other information.
- **Conditional Probability $P(A \mid B)$**: Degree of belief in event $A$ given that evidence $B$ has been observed:
  $$P(A \mid B) = \frac{P(A \land B)}{P(B)} \quad (\text{where } P(B) > 0)$$

### C. Product Rule
$$P(A \land B) = P(A \mid B) P(B) = P(B \mid A) P(A)$$

---

## 3. Bayes' Rule and Its Practical Applications

Equating the two forms of the product rule yields **Bayes' Rule**:
$$P(A \mid B) = \frac{P(B \mid A) \cdot P(A)}{P(B)}$$

In terms of Hypothesis ($H$) and Evidence ($E$):
$$P(H \mid E) = \frac{P(E \mid H) \cdot P(H)}{P(E)}$$
where:
- $P(H \mid E)$ is the **Posterior probability**.
- $P(E \mid H)$ is the **Likelihood** of evidence given the hypothesis.
- $P(H)$ is the **Prior probability** of the hypothesis.
- $P(E)$ is the **Marginal probability** of the evidence, computed using the Law of Total Probability:
  $$P(E) = \sum_{i} P(E \mid H_i) P(H_i)$$

### Practical Worked Example: Medical Diagnosis
Suppose a patient has a stiff neck.
- Prior probability of meningitis: $P(M) = 1/50,000 = 0.00002$.
- Prior probability of stiff neck: $P(S) = 0.01$.
- Likelihood that meningitis causes stiff neck: $P(S \mid M) = 0.70$.

**Calculate the probability that a patient with a stiff neck has meningitis:**
$$P(M \mid S) = \frac{P(S \mid M) \cdot P(M)}{P(S)} = \frac{0.70 \times 0.00002}{0.01} = \frac{0.000014}{0.01} = 0.0014 = 0.14\%$$
Even though a stiff neck is strongly associated with meningitis ($70\%$), because the disease is rare, the actual chance is only $0.14\%$.

---

## 4. Conditional Independence

Two variables $X$ and $Y$ are conditionally independent given $Z$ if:
$$P(X, Y \mid Z) = P(X \mid Z) \cdot P(Y \mid Z)$$
or equivalently:
$$P(X \mid Y, Z) = P(X \mid Z)$$
This conditional independence assumption dramatically reduces the number of parameters needed from exponential ($2^n$) to linear ($O(n)$).

---

## 5. Bayesian Belief Networks (BBN)

A **Bayesian Network** is a probabilistic graphical model that compactly represents the joint probability distribution over a set of random variables.

### Structural Components:
1. **Directed Acyclic Graph (DAG)**:
   - **Nodes**: Represent random variables.
   - **Directed Edges**: Represent direct causal or influential relationships from parent to child.
2. **Conditional Probability Tables (CPT)**:
   - Associated with each node $X_i$, specifying the distribution $P(X_i \mid \text{Parents}(X_i))$.

### The Full Joint Distribution Formula:
Using the chain rule and conditional independence encoded in the DAG:
$$P(X_1, X_2, \dots, X_n) = \prod_{i=1}^n P(X_i \mid \text{Parents}(X_i))$$

### The Classical Burglar Alarm Network (Pearl's Network):
- Nodes: $\text{Burglary } (B)$, $\text{Earthquake } (E)$, $\text{Alarm } (A)$, $\text{JohnCalls } (J)$, $\text{MaryCalls } (M)$.
- Parents of $A$: $\{B, E\}$.
- Parents of $J$: $\{A\}$.
- Parents of $M$: $\{A\}$.

Joint Probability:
$$P(B, E, A, J, M) = P(B) \cdot P(E) \cdot P(A \mid B, E) \cdot P(J \mid A) \cdot P(M \mid A)$$

---

## 6. Markov Decision Processes (MDP) Basics

When an agent must make sequential decisions over time under uncertainty:
An MDP is defined by a 5-tuple $(S, A, P, R, \gamma)$:
1. $S$: Set of environment states.
2. $A$: Set of available actions.
3. $P(s' \mid s, a)$: Transition model (probability of reaching $s'$ from $s$ via action $a$).
4. $R(s, a, s')$: Reward function received.
5. $\gamma \in [0, 1]$: Discount factor for future rewards.

### The Bellman Equation for Optimal State Value $V^*(s)$:
$$V^*(s) = \max_{a \in A} \sum_{s'} P(s' \mid s, a) \left[ R(s, a, s') + \gamma V^*(s') \right]$$
