# Module 3: Knowledge Representation and Reasoning

## 1. Introduction to Logic in AI

To build intelligent agents, we need ways to represent knowledge about the world and algorithms to reason over that knowledge. Logic provides a formal language for this.

*   **Syntax:** Defines the well-formed sentences in the language.
*   **Semantics:** Defines the "meaning" or truth of sentences with respect to a specific "model" (a possible world).
*   **Inference:** The process of deriving new sentences from existing ones. We want inference procedures that are **sound** (only derive true sentences) and **complete** (can derive all true sentences).

## 2. Propositional Logic

A simple logic based on propositions that can be either True or False.

### Syntax
*   **Atomic Sentences:** Proposition symbols (e.g., $P, Q, R$).
*   **Logical Connectives:**
    *   $\neg$ (Not)
    *   $\land$ (And)
    *   $\lor$ (Or)
    *   $\Rightarrow$ (Implies)
    *   $\Leftrightarrow$ (If and only if)

### Reasoning
*   **Truth Tables:** Can be used to evaluate the truth of complex sentences or check validity, but they scale poorly ($O(2^n)$ for $n$ symbols).
*   **Resolution:** A powerful inference rule. If you know $(P \lor Q)$ and $(\neg Q \lor R)$, you can resolve them to deduce $(P \lor R)$. Resolution is complete for propositional logic when used with proof by contradiction.

## 3. First-Order Logic (FOL)

Propositional logic is too restrictive because it cannot represent objects, properties, or relationships generically. FOL solves this.

### Elements of FOL
*   **Constants:** Represent specific objects (e.g., `John`, `Earth`).
*   **Variables:** Stand for any object (e.g., $x, y$).
*   **Predicates:** Represent properties or relations (e.g., `isBrother(John, Paul)`, `isRed(Apple)`). Evaluate to True/False.
*   **Functions:** Return an object (e.g., `fatherOf(John)` returns a person object).
*   **Quantifiers:**
    *   **Universal ($\forall$):** "For all". E.g., $\forall x \text{ King}(x) \Rightarrow \text{Person}(x)$.
    *   **Existential ($\exists$):** "There exists". E.g., $\exists x \text{ Crown}(x) \land \text{onHead}(x, John)$.

## 4. Forward and Backward Chaining

These are inference algorithms used in rule-based systems (like Expert Systems).

*   **Forward Chaining (Data-driven):** Starts with the known facts and applies rules to generate new facts until the goal is reached or no more rules apply. Useful when new data arrives.
*   **Backward Chaining (Goal-driven):** Starts with the goal to be proven and works backward, finding rules that conclude the goal and then trying to prove the premises of those rules. Useful when trying to answer a specific query (like in Prolog).
