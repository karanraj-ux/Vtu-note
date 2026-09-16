# Module 2: Multivariable Calculus & Series Expansion

## VTU Syllabus Code: 1BMATS101 / BMATS101
**Course**: Mathematics for Computer Science & Engineering (Calculus & Linear Algebra)  
**Module Weightage**: 20 Marks in VTU Examination

---

## 1. Taylor's and Maclaurin's Series (Single Variable)

### Taylor's Theorem
If $f(x)$ is continuous and possesses derivatives up to order $n$ in $[a, b]$, then for any $x$ in the neighborhood of $a$:
$$f(x) = f(a) + (x - a) f'(a) + \frac{(x - a)^2}{2!} f''(a) + \dots + \frac{(x - a)^n}{n!} f^{(n)}(a) + \dots$$

### Maclaurin's Series (Expansion about $a = 0$)
$$f(x) = f(0) + x f'(0) + \frac{x^2}{2!} f''(0) + \frac{x^3}{3!} f'''(0) + \dots + \frac{x^n}{n!} f^{(n)}(0) + \dots$$

### Standard Maclaurin Expansions
- $e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \dots$
- $\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \dots$
- $\cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \dots$
- $\ln(1 + x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4} + \dots$
- $(1 + x)^n = 1 + nx + \frac{n(n-1)}{2!} x^2 + \dots$

---

## 2. Indeterminate Forms and L'Hôpital's Rule
When evaluating $\lim_{x \to a} \frac{f(x)}{g(x)}$ yields indeterminate forms such as $\left[\frac{0}{0}\right]$ or $\left[\frac{\infty}{\infty}\right]$, we apply **L'Hôpital's Rule**:
$$\lim_{x \to a} \frac{f(x)}{g(x)} = \lim_{x \to a} \frac{f'(x)}{g'(x)}$$
If the derivative quotient is still indeterminate, repeat the differentiation until a determinate form is achieved.

For forms such as $[0 \times \infty]$, $[\infty - \infty]$, $[0^0]$, $[1^\infty]$, $[\infty^0]$, transform them algebraically or use logarithms:
$$y = [f(x)]^{g(x)} \implies \ln y = g(x) \ln f(x)$$

---

## 3. Partial Differentiation and Total Derivative
For a multivariable function $z = f(x, y)$:
- $\frac{\partial z}{\partial x} = \lim_{\Delta x \to 0} \frac{f(x + \Delta x, y) - f(x, y)}{\Delta x}$ (treating $y$ as constant).
- $\frac{\partial z}{\partial y} = \lim_{\Delta y \to 0} \frac{f(x, y + \Delta y) - f(x, y)}{\Delta y}$ (treating $x$ as constant).

### Total Derivative
If $u = f(x, y)$ where $x = \phi(t)$ and $y = \psi(t)$, the total derivative with respect to $t$ is:
$$\frac{du}{dt} = \frac{\partial u}{\partial x}\frac{dx}{dt} + \frac{\partial u}{\partial y}\frac{dy}{dt}$$

---

## 4. Jacobians

Let $u = u(x, y)$ and $v = v(x, y)$ be two differentiable functions of independent variables $x$ and $y$.  
The **Jacobian of $(u, v)$ with respect to $(x, y)$**, denoted by $J = \frac{\partial(u, v)}{\partial(x, y)}$, is defined as:

$$J = \frac{\partial(u, v)}{\partial(x, y)} = \begin{vmatrix} \frac{\partial u}{\partial x} & \frac{\partial u}{\partial y} \\ \frac{\partial v}{\partial x} & \frac{\partial v}{\partial y} \end{vmatrix} = \frac{\partial u}{\partial x}\frac{\partial v}{\partial y} - \frac{\partial u}{\partial y}\frac{\partial v}{\partial x}$$

### Properties of Jacobians
1. **Chain Rule**: If $u, v$ are functions of $r, s$ and $r, s$ are functions of $x, y$:
   $$\frac{\partial(u, v)}{\partial(x, y)} = \frac{\partial(u, v)}{\partial(r, s)} \cdot \frac{\partial(r, s)}{\partial(x, y)}$$
2. **Reciprocal Property**:
   $$J \cdot J' = \frac{\partial(u, v)}{\partial(x, y)} \cdot \frac{\partial(x, y)}{\partial(u, v)} = 1$$
3. **Functional Dependence**: Two functions $u(x, y)$ and $v(x, y)$ are functionally dependent if and only if:
   $$\frac{\partial(u, v)}{\partial(x, y)} = 0$$

---

## 5. Maxima and Minima for Functions of Two Variables
To find the extreme values of $z = f(x, y)$:

### Step 1: Find Stationary Points
Solve the simultaneous equations:
$$\frac{\partial f}{\partial x} = 0 \quad \text{and} \quad \frac{\partial f}{\partial y} = 0$$
Let $(a, b)$ be a stationary point.

### Step 2: Second Order Partial Derivatives
Compute at $(a, b)$:
$$r = \frac{\partial^2 f}{\partial x^2}, \quad s = \frac{\partial^2 f}{\partial x \partial y}, \quad t = \frac{\partial^2 f}{\partial y^2}$$

### Step 3: Discriminant Criteria
- If **$rt - s^2 > 0$ and $r > 0$**: $f(a, b)$ is a **Local Minimum**.
- If **$rt - s^2 > 0$ and $r < 0$**: $f(a, b)$ is a **Local Maximum**.
- If **$rt - s^2 < 0$**: $(a, b)$ is a **Saddle Point** (neither maximum nor minimum).
- If **$rt - s^2 = 0$**: The test is **Inconclusive** (requires further investigation).
