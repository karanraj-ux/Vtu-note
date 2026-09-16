# Module 3: Linear Algebra — Matrices & System of Linear Equations

## VTU Syllabus Code: 1BMATS101 / BMATS101
**Course**: Mathematics for Computer Science & Engineering (Calculus & Linear Algebra)  
**Module Weightage**: 20 Marks in VTU Examination

---

## 1. Introduction to Matrices & Elementary Operations

A matrix is an $m \times n$ rectangular array of numbers consisting of $m$ rows and $n$ columns.

### Elementary Row Operations
There are three elementary row operations on a matrix $A$:
1. **Row Interchange ($R_i \leftrightarrow R_j$)**: Interchanging the $i$-th and $j$-th rows.
2. **Row Scaling ($R_i \to k R_i, k \neq 0$)**: Multiplying every entry of row $i$ by a non-zero scalar $k$.
3. **Row Addition ($R_i \to R_i + k R_j$)**: Adding $k$ times row $j$ to row $i$.

> **Key Rule**: Elementary row operations **do not alter the rank** of a matrix, nor do they alter the solution set of a system of linear equations.

---

## 2. Row Echelon Form and Rank of a Matrix

### Definition of Row Echelon Form (REF)
A matrix $A$ is in **Row Echelon Form** if:
1. All non-zero rows precede any row of all zeros (zero rows are at the bottom).
2. The leading entry (first non-zero entry from the left, called the **pivot**) of a non-zero row is strictly to the right of the leading entry of the row above it.
3. All entries in a column below a leading pivot are zero.

$$\begin{pmatrix} 
1 & 2 & -1 & 3 \\
0 & 3 & 4 & 1 \\
0 & 0 & 0 & 5 \\
0 & 0 & 0 & 0
\end{pmatrix}$$

### Definition of Rank of a Matrix ($\rho(A)$)
The **rank** of a matrix $A$, denoted by $\rho(A)$ or $\text{rank}(A)$, is the **number of non-zero rows in its row echelon form**.

### Worked Example: Finding the Rank by Echelon Form

**Problem**: Find the rank of the matrix:
$$A = \begin{pmatrix} 1 & 2 & 3 & 2 \\ 2 & 3 & 5 & 1 \\ 1 & 3 & 4 & 5 \end{pmatrix}$$

**Solution**:
Apply elementary row transformations to reduce $A$ to echelon form:
1. Make entries below $a_{11} = 1$ zero:
   - $R_2 \to R_2 - 2R_1$:  
     Row 2 becomes: $(2 - 2(1), 3 - 2(2), 5 - 2(3), 1 - 2(2)) = (0, -1, -1, -3)$
   - $R_3 \to R_3 - R_1$:  
     Row 3 becomes: $(1 - 1, 3 - 2, 4 - 3, 5 - 2) = (0, 1, 1, 3)$

   Now the matrix is:
   $$\begin{pmatrix} 1 & 2 & 3 & 2 \\ 0 & -1 & -1 & -3 \\ 0 & 1 & 1 & 3 \end{pmatrix}$$

2. Eliminate entry below $a_{22}$:
   - $R_3 \to R_3 + R_2$:  
     Row 3 becomes: $(0, 1 + (-1), 1 + (-1), 3 + (-3)) = (0, 0, 0, 0)$

   Matrix in Echelon Form:
   $$\begin{pmatrix} 1 & 2 & 3 & 2 \\ 0 & -1 & -1 & -3 \\ 0 & 0 & 0 & 0 \end{pmatrix}$$

3. **Conclusion**:
   - Number of non-zero rows = $2$.
   - Therefore, $\rho(A) = 2$.

---

## 3. System of Linear Equations & Consistency Criteria

Consider a system of $m$ linear equations in $n$ unknowns:
$$\begin{aligned}
a_{11}x_1 + a_{12}x_2 + \dots + a_{1n}x_n &= b_1 \\
a_{21}x_1 + a_{22}x_2 + \dots + a_{2n}x_n &= b_2 \\
&\vdots \\
a_{m1}x_1 + a_{m2}x_2 + \dots + a_{mn}x_n &= b_m
\end{aligned}$$

In matrix notation:
$$A X = B$$
where $A$ is the coefficient matrix ($m \times n$), $X$ is the column vector of unknowns ($n \times 1$), and $B$ is the column vector of constants ($m \times 1$).

### The Augmented Matrix $[A \mid B]$
$$[A \mid B] = \left(\begin{array}{cccc|c}
a_{11} & a_{12} & \dots & a_{1n} & b_1 \\
a_{21} & a_{22} & \dots & a_{2n} & b_2 \\
\vdots & \vdots & \ddots & \vdots & \vdots \\
a_{m1} & a_{m2} & \dots & a_{mn} & b_m
\end{array}\right)$$

### Rouché-Capelli Theorem (Consistency Test)
1. **Inconsistent (No Solution)**:
   $$\rho(A) \neq \rho([A \mid B])$$
   (i.e., $\rho(A) < \rho([A \mid B])$). The system has NO solution.

2. **Consistent with Unique Solution**:
   $$\rho(A) = \rho([A \mid B]) = n \quad (\text{number of unknowns})$$

3. **Consistent with Infinitely Many Solutions**:
   $$\rho(A) = \rho([A \mid B]) = r < n$$
   There are $(n - r)$ linearly independent arbitrary variables (free parameters).

### Homogeneous System ($AX = 0$)
Since $B = 0$, $\rho([A \mid 0]) = \rho(A)$ always:
- If $\rho(A) = n$: **Trivial solution only** ($x_1 = x_2 = \dots = x_n = 0$).
- If $\rho(A) < n$: **Non-trivial (infinite) solutions** exist.

---

## 4. Gauss Elimination Method

Gauss elimination transforms the augmented matrix $[A \mid B]$ into upper triangular (row echelon) form using elementary row operations, followed by **back substitution**.

### Step-by-Step Solved Problem
**Problem**: Solve the system using Gauss Elimination:
$$\begin{aligned}
x + y + z &= 6 \\
x - y + z &= 2 \\
2x + y - z &= 1
\end{aligned}$$

**Step 1: Form the Augmented Matrix**
$$[A \mid B] = \left(\begin{array}{ccc|c}
1 & 1 & 1 & 6 \\
1 & -1 & 1 & 2 \\
2 & 1 & -1 & 1
\end{array}\right)$$

**Step 2: Reduce to Echelon Form**
- $R_2 \to R_2 - R_1$:
  $$\left(\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\ 0 & -2 & 0 & -4 \\ 2 & 1 & -1 & 1 \end{array}\right)$$
- $R_3 \to R_3 - 2R_1$:
  $$\left(\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\ 0 & -2 & 0 & -4 \\ 0 & -1 & -3 & -11 \end{array}\right)$$
- $R_3 \to 2R_3 - R_2$:
  $$\left(\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\ 0 & -2 & 0 & -4 \\ 0 & 0 & -6 & -18 \end{array}\right)$$

**Step 3: Check Rank**
- $\rho(A) = 3$, $\rho([A \mid B]) = 3$, number of unknowns $n = 3$.
- Since $\rho(A) = \rho([A \mid B]) = 3 = n$, the system is **consistent with a unique solution**.

**Step 4: Back Substitution**
From row 3:
$$-6z = -18 \implies z = 3$$
From row 2:
$$-2y = -4 \implies y = 2$$
From row 1:
$$x + y + z = 6 \implies x + 2 + 3 = 6 \implies x = 1$$

$$\mathbf{Solution:}\; x = 1,\; y = 2,\; z = 3$$

---

## 5. Gauss-Jordan Elimination Method
In the Gauss-Jordan method, elementary row operations are continued until the coefficient matrix $A$ is transformed into the **Identity Matrix $I$** (Reduced Row Echelon Form).  
Then the values of the variables can be read directly from the last column without back substitution:
$$[A \mid B] \xrightarrow{\text{row operations}} [I \mid X]$$

---

## 6. Gauss-Seidel Iterative Method

The Gauss-Seidel method is an **indirect (iterative)** method commonly used for large sparse systems.

### Condition for Convergence: Diagonal Dominance
The coefficient matrix $A$ must be **strictly diagonally dominant** (or made so by rearranging equations):
$$|a_{ii}| \ge \sum_{j \ne i} |a_{ij}|$$
with strict inequality for at least one row.
- In row 1: $|a_{11}| > |a_{12}| + |a_{13}|$
- In row 2: $|a_{22}| > |a_{21}| + |a_{23}|$
- In row 3: $|a_{33}| > |a_{31}| + |a_{32}|$

### Iteration Formulas
Rearrange each equation to solve for the diagonal variable:
$$\begin{aligned}
x^{(k+1)} &= \frac{1}{a_{11}} \left( b_1 - a_{12}y^{(k)} - a_{13}z^{(k)} \right) \\
y^{(k+1)} &= \frac{1}{a_{22}} \left( b_2 - a_{21}x^{(k+1)} - a_{23}z^{(k)} \right) \quad \text{(uses newly computed } x^{(k+1)}\text{)} \\
z^{(k+1)} &= \frac{1}{a_{33}} \left( b_3 - a_{31}x^{(k+1)} - a_{32}y^{(k+1)} \right) \quad \text{(uses newly computed } x^{(k+1)}, y^{(k+1)}\text{)}
\end{aligned}$$

### Solved Example
**Solve by Gauss-Seidel (starting with $x_0 = y_0 = z_0 = 0$):**
$$\begin{aligned}
20x + y - 2z &= 17 \\
3x + 20y - z &= -18 \\
2x - 3y + 20z &= 25
\end{aligned}$$

**Check Diagonal Dominance:**
- Row 1: $|20| > |1| + |-2| = 3$ (True)
- Row 2: $|20| > |3| + |-1| = 4$ (True)
- Row 3: $|20| > |2| + |-3| = 5$ (True)

**Formulas:**
$$x = \frac{17 - y + 2z}{20}, \quad y = \frac{-18 - 3x + z}{20}, \quad z = \frac{25 - 2x + 3y}{20}$$

**Iteration 1:**
- $x^{(1)} = \frac{17 - 0 + 0}{20} = 0.85$
- $y^{(1)} = \frac{-18 - 3(0.85) + 0}{20} = \frac{-20.55}{20} = -1.0275$
- $z^{(1)} = \frac{25 - 2(0.85) + 3(-1.0275)}{20} = \frac{25 - 1.7 - 3.0825}{20} = 1.0109$

**Iteration 2:**
- $x^{(2)} = \frac{17 - (-1.0275) + 2(1.0109)}{20} = 1.0025$
- $y^{(2)} = \frac{-18 - 3(1.0025) + 1.0109}{20} = -0.9998$
- $z^{(2)} = \frac{25 - 2(1.0025) + 3(-0.9998)}{20} = 0.9998$

**Iteration 3:**
- $x^{(3)} \approx 1.0000$
- $y^{(3)} \approx -1.0000$
- $z^{(3)} \approx 1.0000$

$$\mathbf{Result:}\; x = 1.000,\; y = -1.000,\; z = 1.000$$

---

## 7. Important VTU Exam Tips & Formulas
1. **Always test consistency first**: State $\rho(A)$ and $\rho([A \mid B])$ clearly.
2. **Infinite solutions parameter**: When $\rho = 2 < 3$, let $z = k$ and express $x, y$ in terms of $k$.
3. **Gauss-Seidel**: Always verify and write down the diagonal dominance inequalities before performing iterations.
