# Module 4: Linear Algebra — Eigenvalues, Eigenvectors & Diagonalization

## VTU Syllabus Code: 1BMATS101 / BMATS101
**Course**: Mathematics for Computer Science & Engineering (Calculus & Linear Algebra)  
**Module Weightage**: 20 Marks in VTU Examination

---

## 1. Eigenvalues and Eigenvectors

Let $A$ be an $n \times n$ square matrix. A non-zero vector $X$ is called an **eigenvector** (characteristic vector) of $A$ if there exists a scalar $\lambda$ such that:
$$A X = \lambda X \implies (A - \lambda I) X = 0$$
The scalar $\lambda$ is called an **eigenvalue** (characteristic root) of $A$.

### The Characteristic Equation
For a non-trivial solution ($X \neq 0$), the determinant of $(A - \lambda I)$ must vanish:
$$|A - \lambda I| = 0$$

For a $3 \times 3$ matrix $A$, the characteristic polynomial can be written directly as:
$$\lambda^3 - S_1 \lambda^2 + S_2 \lambda - S_3 = 0$$
where:
- $S_1 = \text{trace}(A) = \text{sum of principal diagonal elements} = a_{11} + a_{22} + a_{33}$
- $S_2 = \text{sum of minors of principal diagonal elements} = M_{11} + M_{22} + M_{33}$
- $S_3 = |A| = \text{determinant of } A$

### Essential Properties of Eigenvalues
1. The **sum of the eigenvalues** of $A$ equals the **trace** of $A$:
   $$\sum \lambda_i = \text{trace}(A)$$
2. The **product of the eigenvalues** of $A$ equals the **determinant** of $A$:
   $$\prod \lambda_i = |A|$$
3. The eigenvalues of $A$ and its transpose $A^T$ are identical.
4. If $\lambda$ is an eigenvalue of $A$, then:
   - $k \lambda$ is an eigenvalue of $kA$.
   - $\lambda^m$ is an eigenvalue of $A^m$.
   - $\frac{1}{\lambda}$ is an eigenvalue of $A^{-1}$ (if $A$ is non-singular, $|A| \ne 0$).
5. Eigenvalues of a real symmetric matrix are always **real**.
6. Eigenvectors corresponding to distinct eigenvalues of a real symmetric matrix are **orthogonal**.

---

## 2. Step-by-Step Solved Problem: Finding Eigenvalues & Eigenvectors

**Problem**: Find the eigenvalues and eigenvectors of:
$$A = \begin{pmatrix} 2 & 0 & 1 \\ 0 & 2 & 0 \\ 1 & 0 & 2 \end{pmatrix}$$

### Step 1: Characteristic Equation
- $S_1 = 2 + 2 + 2 = 6$
- $S_2 = \begin{vmatrix} 2 & 0 \\ 0 & 2 \end{vmatrix} + \begin{vmatrix} 2 & 1 \\ 1 & 2 \end{vmatrix} + \begin{vmatrix} 2 & 0 \\ 0 & 2 \end{vmatrix} = 4 + (4 - 1) + 4 = 11$
- $S_3 = |A| = 2(4 - 0) - 0 + 1(0 - 2) = 8 - 2 = 6$

Characteristic Equation:
$$\lambda^3 - 6\lambda^2 + 11\lambda - 6 = 0$$
Factoring:
$$(\lambda - 1)(\lambda - 2)(\lambda - 3) = 0 \implies \mathbf{\lambda_1 = 1,\; \lambda_2 = 2,\; \lambda_3 = 3}$$

### Step 2: Eigenvectors for each $\lambda$
The system is $(A - \lambda I) X = 0$:
$$\begin{pmatrix} 2 - \lambda & 0 & 1 \\ 0 & 2 - \lambda & 0 \\ 1 & 0 & 2 - \lambda \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$$

#### Case 1: For $\lambda_1 = 1$:
$$\begin{pmatrix} 1 & 0 & 1 \\ 0 & 1 & 0 \\ 1 & 0 & 1 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$$
- Row 2 gives: $x_2 = 0$.
- Row 1 gives: $x_1 + x_3 = 0 \implies x_1 = -x_3$.
- Choosing $x_3 = 1 \implies x_1 = -1$.
$$\mathbf{X_1 = \begin{pmatrix} -1 \\ 0 \\ 1 \end{pmatrix}}$$

#### Case 2: For $\lambda_2 = 2$:
$$\begin{pmatrix} 0 & 0 & 1 \\ 0 & 0 & 0 \\ 1 & 0 & 0 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$$
- Row 1: $x_3 = 0$.
- Row 3: $x_1 = 0$.
- $x_2$ is free. Choosing $x_2 = 1$:
$$\mathbf{X_2 = \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}}$$

#### Case 3: For $\lambda_3 = 3$:
$$\begin{pmatrix} -1 & 0 & 1 \\ 0 & -1 & 0 \\ 1 & 0 & -1 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$$
- Row 2: $x_2 = 0$.
- Row 1: $-x_1 + x_3 = 0 \implies x_1 = x_3$.
- Choosing $x_3 = 1 \implies x_1 = 1$.
$$\mathbf{X_3 = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix}}$$

---

## 3. Rayleigh's Power Method for Dominant Eigenvalue

Rayleigh's Power Method is an iterative technique used to find the **numerically largest (dominant) eigenvalue** and its corresponding eigenvector.

### Algorithm
1. Choose an initial non-zero trial vector $X^{(0)}$, usually $\begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix}$ or $\begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$.
2. Compute $Y^{(1)} = A X^{(0)}$.
3. Factor out the largest element in magnitude, say $\lambda^{(1)}$, such that $Y^{(1)} = \lambda^{(1)} X^{(1)}$, where the largest component of $X^{(1)}$ is $1$.
4. Repeat:
   $$Y^{(k+1)} = A X^{(k)} = \lambda^{(k+1)} X^{(k+1)}$$
5. Continue until $|\lambda^{(k+1)} - \lambda^{(k)}| < \epsilon$ (the desired tolerance).

### Solved Example
**Find the dominant eigenvalue and eigenvector of $A = \begin{pmatrix} 2 & -1 & 0 \\ -1 & 2 & -1 \\ 0 & -1 & 2 \end{pmatrix}$ using initial vector $X^{(0)} = \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix}$.**

- **Iteration 1**:
  $$A X^{(0)} = \begin{pmatrix} 2 & -1 & 0 \\ -1 & 2 & -1 \\ 0 & -1 & 2 \end{pmatrix} \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} = 1 \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} \implies \lambda^{(1)} = 1,\; X^{(1)} = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix}$$

- **Iteration 2**:
  $$A X^{(1)} = \begin{pmatrix} 2 & -1 & 0 \\ -1 & 2 & -1 \\ 0 & -1 & 2 \end{pmatrix} \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} = \begin{pmatrix} 2 \\ -2 \\ 2 \end{pmatrix} = 2 \begin{pmatrix} 1 \\ -1 \\ 1 \end{pmatrix} \implies \lambda^{(2)} = 2,\; X^{(2)} = \begin{pmatrix} 1 \\ -1 \\ 1 \end{pmatrix}$$

- **Iteration 3**:
  $$A X^{(2)} = \begin{pmatrix} 2 & -1 & 0 \\ -1 & 2 & -1 \\ 0 & -1 & 2 \end{pmatrix} \begin{pmatrix} 1 \\ -1 \\ 1 \end{pmatrix} = \begin{pmatrix} 3 \\ -4 \\ 3 \end{pmatrix} = -4 \begin{pmatrix} -0.75 \\ 1 \\ -0.75 \end{pmatrix} = 3.414 \dots$$

After 5 iterations:
$$\lambda \approx 3.414, \quad X \approx \begin{pmatrix} 0.707 \\ -1 \\ 0.707 \end{pmatrix}$$

---

## 4. Diagonalization of a Matrix

A square matrix $A$ of order $n$ is **diagonalizable** if there exists an invertible matrix $P$ (the modal matrix formed by the eigenvectors of $A$) and a diagonal matrix $D$ (the spectral matrix formed by eigenvalues) such that:
$$P^{-1} A P = D = \begin{pmatrix} \lambda_1 & 0 & 0 \\ 0 & \lambda_2 & 0 \\ 0 & 0 & \lambda_3 \end{pmatrix}$$

### Orthogonal Diagonalization for Symmetric Matrices
If $A$ is a real symmetric matrix, its normalized eigenvectors $u_1, u_2, u_3$ form an **orthogonal matrix $P$**:
$$P^T P = I \implies P^{-1} = P^T$$
Thus:
$$P^T A P = D$$

---

## 5. Quadratic Forms to Canonical Forms
A quadratic form in three variables $x, y, z$ is:
$$Q = a x^2 + b y^2 + c z^2 + 2f yz + 2g zx + 2h xy = X^T A X$$
where the symmetric matrix $A$ is:
$$A = \begin{pmatrix} a & h & g \\ h & b & f \\ g & f & c \end{pmatrix}$$

By orthogonal transformation $X = P Y$:
$$Q = Y^T D Y = \lambda_1 y_1^2 + \lambda_2 y_2^2 + \lambda_3 y_3^2$$
This is the **canonical form**.

### Nature of Quadratic Form:
- **Positive Definite**: All $\lambda_i > 0$.
- **Negative Definite**: All $\lambda_i < 0$.
- **Positive Semi-definite**: All $\lambda_i \ge 0$ with at least one $\lambda_i = 0$.
- **Negative Semi-definite**: All $\lambda_i \le 0$ with at least one $\lambda_i = 0$.
- **Indefinite**: Some eigenvalues are positive and some are negative.

---

## 6. Singular Value Decomposition (SVD) Basics
For any real $m \times n$ matrix $A$:
$$A = U \Sigma V^T$$
where:
- $U$ is an $m \times m$ orthogonal matrix (eigenvectors of $A A^T$).
- $V$ is an $n \times n$ orthogonal matrix (eigenvectors of $A^T A$).
- $\Sigma$ is an $m \times n$ diagonal matrix with non-negative entries $\sigma_i = \sqrt{\lambda_i}$, called the **singular values** of $A$, arranged in descending order $\sigma_1 \ge \sigma_2 \ge \dots \ge 0$.
