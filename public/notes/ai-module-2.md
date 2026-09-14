# Module 2: Problem Solving via Search

## 1. Problem Solving as Search

In AI, many tasks can be modeled as searching for a path in a state-space graph from an initial state to a goal state.

*   **State Space:** The set of all possible states (configurations) of the environment.
*   **Initial State:** The state where the agent begins.
*   **Goal State(s):** The state(s) the agent wishes to reach.
*   **Actions:** The set of valid moves or transitions from one state to another.
*   **Path Cost:** The numerical cost of taking a specific path (sum of individual action costs).

## 2. Uninformed Search Strategies

These strategies have no additional information about the states beyond that provided in the problem definition. They search "blindly."

### Breadth-First Search (BFS)
*   **Mechanism:** Expands the shallowest unexpanded node. Uses a FIFO queue.
*   **Completeness:** Yes (if branching factor $b$ is finite).
*   **Optimality:** Yes (if step costs are uniform).
*   **Time & Space Complexity:** $O(b^d)$, where $d$ is the depth of the shallowest solution. Memory is the main bottleneck.

### Depth-First Search (DFS)
*   **Mechanism:** Expands the deepest unexpanded node. Uses a LIFO queue (stack).
*   **Completeness:** No (can get stuck in infinite loops in infinite spaces or spaces with cycles).
*   **Optimality:** No.
*   **Time Complexity:** $O(b^m)$, where $m$ is the maximum depth of the space.
*   **Space Complexity:** $O(bm)$ - much better than BFS!

### Iterative Deepening Search (IDS)
*   **Mechanism:** Repeatedly runs DFS with an increasing depth limit ($0, 1, 2, ...$).
*   **Advantage:** Combines the memory efficiency of DFS with the completeness and optimality (for uniform costs) of BFS.

## 3. Informed (Heuristic) Search Strategies

These strategies use domain-specific knowledge, captured in a heuristic function, to guide the search more efficiently.

*   **Heuristic Function $h(n)$:** Estimated cost of the cheapest path from the state at node $n$ to a goal state.

### Greedy Best-First Search
*   **Mechanism:** Expands the node that appears to be closest to the goal. Evaluation function $f(n) = h(n)$.
*   **Completeness:** No (can get stuck in loops).
*   **Optimality:** No.

### A* Search
*   **Mechanism:** Evaluates nodes by combining the cost to reach the node and the estimated cost to the goal.
    $$f(n) = g(n) + h(n)$$
    Where $g(n)$ is the cost from the start to node $n$.
*   **Completeness:** Yes.
*   **Optimality:** Yes, provided the heuristic is **admissible** (never overestimates the true cost) and **consistent**.

## 4. Local Search Algorithms

Instead of exploring paths from a start state, local search algorithms start with a complete configuration and make local modifications to improve it. They are useful for optimization problems.

*   **Hill-Climbing:** Continually moves in the direction of increasing value (steepest ascent). Prone to getting stuck in local maxima.
*   **Simulated Annealing:** Escapes local maxima by allowing some "bad" moves, but gradually decreases their probability over time (like cooling a metal).
*   **Genetic Algorithms:** Inspired by biological evolution. Maintains a population of states, combines them via crossover and mutation, and selects the fittest to survive.
