# Module 2: Problem Solving via Search Strategies

## Course: Introduction to Artificial Intelligence (1BAIA103)
**Module Weightage**: 20 Marks in VTU Examination

---

## 1. Problem Solving as State Space Search
In Artificial Intelligence, many tasks are formulated as finding a sequence of actions that leads from an initial state to a goal state within a state space.

### Key Components of a Well-Formed Problem Formulation:
1. **Initial State ($s_0$)**: The starting condition of the agent.  
   *(Example: In the 8-puzzle, the scrambled configuration of tiles).*
2. **Actions / Operators ($A(s)$)**: The set of legal moves available in state $s$.  
   *(Example: Sliding the blank space Left, Right, Up, or Down).*
3. **Transition Model ($Result(s, a)$)**: Returns the resulting state after performing action $a$ in state $s$.
4. **Goal Test ($IsGoal(s)$)**: Determines whether a given state satisfies the goal condition.
5. **Path Cost ($c(s, a, s')$)**: The numerical step cost of taking action $a$ from $s$ to $s'$. The total path cost is denoted $g(n)$.

---

## 2. Classical AI Toy Problems

### A. The 8-Puzzle Problem
- **States**: A $3 \times 3$ grid containing 8 numbered tiles and one empty blank space. There are $\frac{9!}{2} = 181,440$ reachable states.
- **Actions**: Move blank space Left, Right, Up, Down.
- **Goal State**: Numbered tiles arranged in ascending order (1 to 8 with blank at the center or bottom-right).
- **Heuristics used in A***:
  1. $h_1(n)$: Number of misplaced tiles (admissible).
  2. $h_2(n)$: Manhattan distance (sum of horizontal and vertical distances of tiles from goal positions; strictly dominates $h_1$).

### B. The Water Jug Problem
Given two jugs of capacity $4$ liters and $3$ liters with no markings, obtain exactly $2$ liters in the $4$-liter jug using an infinite water supply.
- State: $(x, y)$ where $x \in \{0,1,2,3,4\}$ and $y \in \{0,1,2,3\}$.
- Actions: Fill jug, Empty jug, Pour water from one jug to another until full or empty.

---

## 3. Uninformed (Blind) Search Strategies
Uninformed search strategies have no domain knowledge beyond the problem definition.

### A. Breadth-First Search (BFS)
- **Algorithm**: Expands the shallowest unexpanded node first using a **FIFO Queue**.
- **Completeness**: Yes (if branching factor $b$ is finite).
- **Time Complexity**: $O(b^d)$, where $d$ is depth of the shallowest solution.
- **Space Complexity**: $O(b^d)$ (retains all nodes in memory — massive memory bottleneck).
- **Optimality**: Yes (if all step costs are equal).

### B. Depth-First Search (DFS)
- **Algorithm**: Expands the deepest node first using a **LIFO Stack** or recursive calls.
- **Completeness**: No in infinite state spaces or graphs with cycles; Yes in finite state spaces with graph search.
- **Time Complexity**: $O(b^m)$, where $m$ is the maximum depth of the state space.
- **Space Complexity**: $O(b \cdot m)$ (linear memory — very space efficient).
- **Optimality**: No (can find an arbitrarily deep, non-optimal goal).

### C. Depth-Limited Search (DLS) & Iterative Deepening DFS (IDDFS)
- **Depth-Limited Search**: DFS with a predetermined depth cutoff limit $l$. Avoids infinite loops but incomplete if $d > l$.
- **Iterative Deepening Search (IDDFS)**:
  - Systematically combines the benefits of BFS (completeness & optimality) and DFS (minimal memory $O(b \cdot d)$).
  - Runs DLS for limit $l = 0, 1, 2, \dots$ until a goal is found.
  - **Preferred uninformed search method** when the search space is large and depth is unknown.

### D. Uniform Cost Search (Dijkstra's on Graphs)
- Expands the node with the lowest cumulative path cost $g(n)$ using a **Priority Queue**.
- **Completeness**: Yes, provided step costs are $\ge \epsilon > 0$.
- **Optimality**: Yes, finds the cost-optimal path.

### Comparison Table of Uninformed Search:
| Strategy | Frontier DS | Complete? | Time Complexity | Space Complexity | Optimal? |
|---|---|---|---|---|---|
| **BFS** | FIFO Queue | Yes | $O(b^d)$ | $O(b^d)$ | Yes (if equal costs) |
| **DFS** | LIFO Stack | No (in cycles) | $O(b^m)$ | $O(b \cdot m)$ | No |
| **DLS** | Stack with limit $l$| No (if $l < d$) | $O(b^l)$ | $O(b \cdot l)$ | No |
| **IDDFS** | Repeated Stack | Yes | $O(b^d)$ | $O(b \cdot d)$ | Yes (if equal costs) |
| **UCS** | Priority Queue ($g$) | Yes | $O(b^{1 + \lfloor C^* / \epsilon \rfloor})$ | $O(b^{1 + \lfloor C^* / \epsilon \rfloor})$ | Yes |

---

## 4. Informed (Heuristic) Search Strategies

Heuristic search uses domain-specific knowledge represented by an evaluation function $f(n)$ and a heuristic function $h(n)$.
- $h(n)$ = estimated cost of the cheapest path from node $n$ to a goal state.
- For goal nodes: $h(\text{goal}) = 0$.

### A. Greedy Best-First Search
- Evaluates nodes using $f(n) = h(n)$.
- Always expands the node that appears closest to the goal.
- **Pros**: Fast in simple domains.
- **Cons**: Incomplete, non-optimal, easily misled by false paths.

### B. A* Search Algorithm
A* combines the cost incurred so far $g(n)$ and the estimated cost to the goal $h(n)$:
$$f(n) = g(n) + h(n)$$
- $g(n)$: Actual cost from the initial state to node $n$.
- $h(n)$: Estimated cost from node $n$ to the goal.
- $f(n)$: Estimated total cost of the path through $n$ to the goal.

#### Admissibility of a Heuristic:
A heuristic $h(n)$ is **admissible** if it **never overestimates** the true cost to reach the nearest goal:
$$0 \le h(n) \le h^*(n)$$
where $h^*(n)$ is the true optimal cost from $n$ to the goal.
> **Theorem**: If $h(n)$ is admissible, A* tree-search is guaranteed to be **optimal**.

#### Consistency (Monotonicity) of a Heuristic:
A heuristic is **consistent** if for every node $n$ and every successor $n'$ generated by action $a$:
$$h(n) \le c(n, a, n') + h(n')$$
*(Triangle inequality for heuristics)*.
> **Theorem**: If $h(n)$ is consistent, A* graph-search is **optimal and never requires re-opening closed nodes**.

---

## 5. Local Search & Optimization Algorithms

When the path to the goal does not matter, but only the final state configuration matters (e.g., $N$-Queens, VLSI circuit design, Travelling Salesperson).

### A. Hill Climbing Search (Greedy Local Search)
- Continually moves in the direction of increasing value (or decreasing cost).
- Terminates when it reaches a peak where no neighbor has a higher value.

#### Three Common Failure Modes of Hill Climbing:
1. **Local Maxima**: A peak higher than its neighbors but lower than the global maximum.
2. **Ridges**: A sequence of local maxima where the orientation makes progress difficult with simple step moves.
3. **Plateaus**: A flat area of the state space where all neighboring states have the same value (leads to wandering).

### B. Simulated Annealing
- Inspired by metallurgical annealing (controlled cooling of heated metal).
- Instead of always picking the best move, it allows **downhill (worse) moves** with a probability determined by:
  $$P(\text{accept worse move}) = e^{\Delta E / T}$$
- As temperature $T$ gradually decreases according to an annealing schedule, the algorithm settles into the **global optimum**.
