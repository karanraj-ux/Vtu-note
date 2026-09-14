# Module 1: Introduction to Artificial Intelligence

## Chapter 1: Introduction to Artificial Intelligence

### 1. Definition of Artificial Intelligence
*   **Artificial Intelligence (AI)** is the science and engineering of making intelligent machines, especially intelligent computer programs, John McCarthy (2004).
*   The concept of AI was first explored in **1950 by Alan Turing**, a British mathematician and computer scientist, who proposed the Turing Test.
*   **From a layman’s view**, artificial intelligence (AI) simply means the intelligence demonstrated by machines that helps them to mimic the actions of humans. AI simulates natural intelligence in machines that are programmed to learn from experiences, adjust to new inputs, and perform human-like tasks.
*   **For researchers**, AI refers to a set of algorithms that help a machine make decisions and act without being explicitly told what to do each time.
*   A few languages that are popularly used to code AI applications are **R, Python, and Java**.
*   Most AI examples, from chess-playing computers to self-driving cars, heavily depend on deep learning and natural language processing techniques.

**Some applications of AI are:**
1.  **Healthcare** – Disease diagnosis, medical imaging, and drug discovery.
2.  **Education** – Personalized learning, AI tutors, and automated grading.
3.  **Business & Finance** – Fraud detection, customer chatbots, and stock predictions.
4.  **Agriculture** – Crop disease detection, precision farming, and yield prediction.
5.  **Transportation** – Self-driving cars, traffic management, and logistics optimization.

### 2. How Does AI Work?
AI works best when it is trained with a large amount of labeled data. By studying this data, it finds patterns and uses them to make predictions.
*Example: A chatbot trained with many chat examples can learn to talk with people.*

**AI programming mainly focuses on three skills:**

1.  **Learning – gaining knowledge from data.**
    AI programs need data to work. They collect and study this data to understand it. To make the data useful, AI creates rules called **algorithms**. An algorithm is simply a step-by-step set of instructions that tells the computer how to solve a problem or perform a task.
2.  **Reasoning – making decisions using rules and logic.**
    The success of an AI program depends on selecting the right algorithm because different problems need different methods.
3.  **Self-correction – improving performance over time.**
    AI programs are built to keep improving themselves. They update and refine their algorithms so that the results become more accurate over time.

### Case Study: Why is AI important?
AI helps businesses understand their operations better and find new opportunities. In many cases, AI can perform tasks faster and more accurately than humans.
*Example: Uber uses AI and machine learning to study ride patterns. It can predict when and where more people will need taxis and alert drivers.*

### 3. Advantages and Disadvantages of AI
**Advantages:**
*   Performs well on tasks that uses detailed data.
*   Takes less time to perform tasks that needs to process huge volumes of data.
*   Generates consistent and accurate results.
*   Can be used 24 X 7.
*   Optimizes tasks by better utilizing resources.
*   Automates complex processes.

**Disadvantages:**
*   Involves more cost.
*   Technical expertise required to develop and use AI applications.
*   Lack of trained professionals.
*   Incomplete or inaccurate data may result in disastrous results.
*   Lacks the capability to generalize tasks.

---

## 4. Types of AI

AI is mainly categorized into two types:
1. Based on Capabilities
2. Based on Functionalities

### 1. Based on Capabilities
Capabilities mean the level of intelligence of AI – how powerful it is compared to humans.

*   **Weak AI (Narrow AI)**
    *   Designed to do one specific task.
    *   Examples: Siri, Alexa, weather forecasting, predicting stock prices, Google search.
*   **Strong AI (Artificial General Intelligence - AGI)**
    *   Tries to mimic human thinking. It can do tasks even if it was not trained for them.
    *   Uses thinking skills and fuzzy logic (not just yes/no).
    *   *Future potential:* Experts believe that Strong AI might one day surpass human intelligence, but it’s not expected to happen anytime soon.

### 2. Based on Functionalities
This means AI is classified according to how it works, behaves, and interacts with its environment.

*   **Reactive Machines**: Simplest type. React to situations based on immediate input, no memory. (e.g., IBM’s Deep Blue).
*   **Limited Memory**: Can remember data for a short time. (e.g., Autonomous vehicles, AlphaGo). Uses models like Reinforcement Learning, LSTM, E-GAN.
*   **Theory of Mind**: Aims to create machines that can understand thoughts, emotions, and memories. (Still theoretical).
*   **Self-Awareness**: Most advanced form. Human-like consciousness and awareness. (Future possibility).

---

## Chapter 2: Problem-Solving Techniques

### 1. Defining Intelligence & Categories
*   **Linguistic Intelligence**: Ability to speak, recognize, and use phonology.
*   **Musical Intelligence**: Pitch, rhythm, and sound.
*   **Logical–Mathematical Intelligence**: Complex, abstract ideas.
*   **Spatial Intelligence**: Manipulate visual/spatial information.
*   **Bodily–Kinaesthetic Intelligence**: Manipulate objects.
*   **Intrapersonal / Interpersonal Intelligence**: Understanding self and others.

### 2. Components of Intelligence
1.  **Reasoning**: Inductive (Observe first, generalize) vs. Deductive (Rule first, apply).
2.  **Learning**: Auditory, Episodic, Motor, Observational, Perceptual, Relational, Spatial, Stimulus-Response.
3.  **Problem solving**: Identifying the problem and making decisions.
4.  **Perception**: Acquiring and interpreting sensory information.
5.  **Linguistic Intelligence**.

### 3. Agent and Environment
*   **AI Agent**: Anything that makes decisions to achieve the best result (Human, Robotic, or Software agent).
*   **Rationality**: Ability to make responsible and sensible decisions. Maximize performance based on PEAS (Performance measure, Environment, Actuators, and Sensors).

**Structure of Intelligent Agents:**
`Agent = Architecture + Agent Program`

**Types of Agents:**
1.  **Simple Reflex Agents**: Choose actions based only on current percept.
2.  **Model-Based Reflex Agents**: Use a model of the world to choose actions, maintain internal state.
3.  **Goal-Based Agents**: Choose actions to achieve goals.
4.  **Utility-Based Agents**: Focus on goals that matter most, maximizing happiness/satisfaction.
5.  **Learning Agent**: Improves itself by learning from past experiences (Learning element, Critic, Performance element, Problem generator).

### 4. Types of Environments
*   Discrete vs. Continuous
*   Known vs. Unknown
*   Observable vs. Partially Observable
*   Static vs. Dynamic (and Semi-Dynamic)
*   Single-Agent vs. Multi-Agent
*   Accessible vs. Inaccessible
*   Deterministic vs. Non-Deterministic (Stochastic)
*   Episodic vs. Sequential

---

## Chapter 3: Knowledge Representation

### 1. Introduction
Humans use their knowledge to understand, reason, and act in the real world. For machines, this ability comes under **knowledge representation and reasoning (KRR)**.

**Types of Knowledge in AI:**
1.  **Meta-Knowledge**: Knowledge about knowledge itself.
2.  **Heuristic Knowledge**: Based on experience or expert opinion (rule of thumb).
3.  **Procedural Knowledge**: Knowledge of how to do something (step-by-step).
4.  **Declarative Knowledge**: Facts and information (descriptive).
5.  **Structural Knowledge**: Relationships between concepts or objects.

### 2. Logic in AI
*   **Syntax**: Rules that define how sentences are formed.
*   **Semantics**: Meaning of sentences.
*   **Logical Inference**: Process of reasoning to deduce new conclusions.

### 3. Knowledge-Based Agent (KBA)
Agents that mimic a human being’s knowledge. Uses knowledge and reasoning to act efficiently.
*   **Knowledge Base (KB)**: Stores facts as logical sentences.
*   **Inference Engine (IE)**: Reasons with facts to make decisions.

**Operations:**
*   **TELL**: Provide KB with info about environment.
*   **ASK**: Query the KB to determine action.
*   **PERFORM**: Execute action.

### 4. Types of Knowledge
*   **Simple Relational Knowledge**: Stored in tables/relations.
*   **Inheritable Knowledge**: Stored in a class hierarchy (general -> specific), uses IS-A relationships.
*   **Inferential Knowledge**: Represented using formal logic, enables deriving new facts from existing ones.

---
*End of Module 1 Notes.*
