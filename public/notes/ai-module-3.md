# Module 3: Knowledge Representation and Logic

## Course: Introduction to Artificial Intelligence (1BAIA103)
**Module Weightage**: 20 Marks in VTU Examination

---

## 1. Knowledge-Based Agents & The Representation Problem

An intelligent agent needs knowledge about the real world to make valid inferences, plan complex actions, and communicate.
A **Knowledge-Based Agent (KBA)** consists of:
1. **Knowledge Base (KB)**: A set of sentences expressed in a formal Knowledge Representation Language.
2. **Inference Engine**: Algorithms for deriving new sentences from existing knowledge in the KB.

### Operations on the Knowledge Base:
- $\text{TELL}(\text{KB}, \alpha)$: Adds a new percept or fact $\alpha$ to the KB.
- $\text{ASK}(\text{KB}, \alpha)$: Queries whether sentence $\alpha$ is entailed by the KB.

---

## 2. Propositional Logic (PL)

Propositional logic deals with declarative statements that are either **True ($T$)** or **False ($F$)**.

### A. Syntax & Connectives
- **Proposition Symbols**: $P, Q, R, S$ represent atomic facts (e.g., $P$: "It is raining").
- **Logical Connectives**:
  1. Negation ($\neg P$ or $\sim P$): NOT
  2. Conjunction ($P \land Q$): AND
  3. Disjunction ($P \lor Q$): OR
  4. Implication ($P \implies Q$): IF-THEN (Premise $\implies$ Conclusion). Equivalence: $\neg P \lor Q$.
  5. Biconditional ($P \iff Q$): IF AND ONLY IF. Equivalence: $(P \implies Q) \land (Q \implies P)$.

### B. Semantics & Truth Table Equivalence
| $P$ | $Q$ | $\neg P$ | $P \land Q$ | $P \lor Q$ | $P \implies Q$ | $P \iff Q$ |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| T | T | F | T | T | T | T |
| T | F | F | F | T | F | F |
| F | T | T | F | T | T | F |
| F | F | T | F | F | T | T |

### C. Important Logical Equivalences
- **De Morgan’s Laws**:
  - $\neg(P \land Q) \equiv \neg P \lor \neg Q$
  - $\neg(P \lor Q) \equiv \neg P \land \neg Q$
- **Contraposition**:
  - $P \implies Q \equiv \neg Q \implies \neg P$
- **Distributive Laws**:
  - $P \land (Q \lor R) \equiv (P \land Q) \lor (P \land R)$
  - $P \lor (Q \land R) \equiv (P \lor Q) \land (P \lor R)$

---

## 3. The Wumpus World Environment
A classical benchmark environment for knowledge-based reasoning:
- **Grid**: $4 \times 4$ cave.
- **Agent**: Starts at $[1,1]$ facing Right.
- **Pits**: Any room adjacent to a pit has a **Breeze**.
- **Wumpus**: Beast that eats the agent. Any room adjacent to the Wumpus has a **Stench**.
- **Gold**: Shines with **Glitter**.
- **Reasoning**: The agent can deduce safe squares by combining observations:
  $$B_{1,1} \iff (P_{1,2} \lor P_{2,1})$$

---

## 4. First-Order Predicate Logic (FOL / FOPL)

While Propositional Logic can only represent facts as atomic units, First-Order Logic provides much greater expressive power by introducing:
1. **Objects**: People, numbers, theories, colors ($John, Mary, 5, Blue$).
2. **Relations / Predicates**: Properties of objects or relationships between them ($\text{Brother}(John, Bob), \text{IsEven}(4)$).
3. **Functions**: Mappings returning an object rather than a truth value ($\text{MotherOf}(John), \text{Plus}(2, 3)$).
4. **Quantifiers**:
   - **Universal Quantifier ($\forall x$)**: "For all $x$".  
     *(Example: $\forall x (\text{Student}(x) \implies \text{Smart}(x))$).*
   - **Existential Quantifier ($\exists x$)**: "There exists at least one $x$".  
     *(Example: $\exists x (\text{Student}(x) \land \text{HardWorking}(x))$).*

---

## 5. Inference Rules and Proof Procedures

### A. Modus Ponens
$$\frac{\alpha \implies \beta, \quad \alpha}{\beta}$$

### B. Resolution by Refutation (Robinson's Principle)
Resolution is a sound and complete inference rule for sentences in **Conjunctive Normal Form (CNF)**:
$$\frac{\alpha \lor \beta, \quad \neg \beta \lor \gamma}{\alpha \lor \gamma}$$

#### Conversion to CNF Steps:
1. Eliminate biconditionals: Replace $\alpha \iff \beta$ with $(\alpha \implies \beta) \land (\beta \implies \alpha)$.
2. Eliminate implications: Replace $\alpha \implies \beta$ with $\neg \alpha \lor \beta$.
3. Move $\neg$ inward using De Morgan’s laws and double negation ($\neg \neg \alpha \equiv \alpha$).
4. Standardize variables (ensure each quantifier binds a unique variable).
5. **Skolemization**: Replace existentially quantified variables with Skolem constants or Skolem functions.
6. Drop universal quantifiers ($\forall$).
7. Distribute $\lor$ over $\land$ to form conjunction of clauses.

#### Proof by Resolution Refutation:
To prove $\text{KB} \models \alpha$:
1. Add $\neg \alpha$ to the KB.
2. Convert all sentences in $\text{KB} \cup \{\neg \alpha\}$ to CNF.
3. Repeatedly apply resolution to pairs of clauses with complementary literals until the **Empty Clause ($\Box$)** is derived (proof of contradiction).

---

## 6. Forward vs. Backward Chaining

| Feature | Forward Chaining (Data-Driven) | Backward Chaining (Goal-Driven) |
|---|---|---|
| **Starting Point** | Starts from known initial facts in KB | Starts from the queried goal |
| **Direction** | Infers new facts forward until goal is reached | Searches backward for rules that conclude the goal |
| **Efficiency** | Can derive many irrelevant facts | Focuses only on facts relevant to the query |
| **Best suited for** | Monitoring, sensor data, diagnosis | Interactive consultation, theorem proving, Prolog |

---

## 7. Structured Knowledge Representations
1. **Semantic Networks**: Directed graphs where nodes represent concepts/objects and edges represent relations (e.g., `is-a`, `has-part`).
2. **Frames**: Data structures with named slots and fillers/default values, supporting object inheritance.
3. **Ontologies**: Formal, explicit specifications of a shared conceptualization within an engineering domain.
