# Module 4: Reasoning under Uncertainty

## 1. Handling Uncertainty in AI

In the real world, agents rarely have complete and perfect information. They must deal with uncertainty caused by:
*   Partial observability (sensors can't see everything).
*   Nondeterminism (actions don't always have predictable outcomes).
*   Ignorance (the rules of the domain are not fully known).

Instead of absolute True/False logic, we use **Probability Theory** to assign degrees of belief to statements.

## 2. Basic Probability Concepts

*   **Random Variables:** Variables that can take on different values from a domain, each with a probability (e.g., $Weather \in \{Sunny, Rain, Cloudy\}$).
*   **Prior (Unconditional) Probability:** The probability of an event before any evidence is observed, denoted $P(A)$.
*   **Posterior (Conditional) Probability:** The probability of an event given that some evidence $B$ has been observed, denoted $P(A|B)$.

## 3. Bayes' Rule

The cornerstone of probabilistic reasoning in AI. It allows us to update our beliefs based on new evidence.

$$P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}$$

*   **Use Case:** Medical diagnosis. We want to know the probability of a disease given a symptom $P(Disease|Symptom)$. We usually have data on the prior probability of the disease $P(Disease)$ and the causal probability that the disease causes the symptom $P(Symptom|Disease)$.

## 4. Bayesian Networks (Belief Networks)

Representing the full joint probability distribution for many variables requires massive amounts of data and memory. Bayesian Networks solve this by exploiting conditional independence.

*   **Structure:** A Directed Acyclic Graph (DAG) where nodes represent random variables and directed edges represent direct causal influences.
*   **CPTs:** Each node has a Conditional Probability Table (CPT) that quantifies the effect of its parents on the node.
*   **Advantage:** Drastically reduces the number of probabilities that need to be specified.

## 5. Decision Theory and Utility

When an agent must choose an action under uncertainty, it uses Decision Theory.

*   **Decision Theory = Probability Theory + Utility Theory**
*   **Utility Function:** Assigns a numerical score to a state, representing how "happy" the agent is in that state.
*   **Maximum Expected Utility (MEU):** A rational agent should choose the action that maximizes the expected utility of the possible outcomes, weighted by their probabilities.
