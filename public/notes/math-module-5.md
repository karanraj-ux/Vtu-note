# Module 5: Ordinary Differential Equations (ODE) of Higher Order

## VTU Syllabus Code: 1BMATS101 / BMATS101
**Course**: Mathematics for Computer Science & Engineering (Calculus & Linear Algebra)  
**Module Weightage**: 20 Marks in VTU Examination

---

## 1. Linear Differential Equations with Constant Coefficients
A linear differential equation of order $n$ with constant coefficients is of the form:
$$\frac{d^n y}{dx^n} + a_1 \frac{d^{n-1}y}{dx^{n-1}} + \dots + a_n y = X(x)$$
In operator notation with $D = \frac{d}{dx}$:
$$f(D) y = X$$
where $f(D) = D^n + a_1 D^{n-1} + \dots + a_n$.

### Complete Solution
The general solution consists of two parts:
$$y = y_c + y_p = \text{Complementary Function (CF)} + \text{Particular Integral (PI)}$$

---

## 2. Complementary Function ($y_c$)
The complementary function is the solution to the homogeneous equation $f(D) y = 0$.  
Let the **auxiliary equation (AE)** be $f(m) = 0$.

| Roots of Auxiliary Equation ($m$) | Nature of Roots | Complementary Function ($y_c$) |
|---|---|---|
| $m_1, m_2, \dots$ (real & distinct) | Distinct Real | $c_1 e^{m_1 x} + c_2 e^{m_2 x} + \dots$ |
| $m_1 = m_2 = m$ (repeated twice) | Real & Equal | $(c_1 + c_2 x) e^{mx}$ |
| $m_1 = m_2 = m_3 = m$ (repeated thrice) | Real & Equal | $(c_1 + c_2 x + c_3 x^2) e^{mx}$ |
| $\alpha \pm i \beta$ (complex conjugate) | Complex | $e^{\alpha x}(c_1 \cos \beta x + c_2 \sin \beta x)$ |
| $\alpha \pm i \beta$ (repeated twice) | Repeated Complex | $e^{\alpha x}[(c_1 + c_2 x)\cos \beta x + (c_3 + c_4 x)\sin \beta x]$ |

---

## 3. Particular Integral ($y_p$)
$$y_p = \frac{1}{f(D)} X(x)$$

### Case 1: $X(x) = e^{ax}$
$$y_p = \frac{1}{f(D)} e^{ax} = \frac{1}{f(a)} e^{ax} \quad \text{provided } f(a) \neq 0$$
If $f(a) = 0$ (case of failure):
$$y_p = x \frac{1}{f'(a)} e^{ax}$$

### Case 2: $X(x) = \sin(ax)$ or $\cos(ax)$
Replace $D^2$ with $-a^2$:
$$y_p = \frac{1}{f(D^2)} \sin(ax) = \frac{1}{f(-a^2)} \sin(ax) \quad \text{provided } f(-a^2) \neq 0$$
If $f(-a^2) = 0$ (case of failure):
$$y_p = x \frac{1}{f'(D^2)} \sin(ax)$$

### Case 3: $X(x) = x^m$ (Polynomial)
Expand $\frac{1}{f(D)}$ in ascending powers of $D$ using binomial expansion up to order $m$:
$$y_p = [f(D)]^{-1} x^m = (1 \pm \phi(D))^{-1} x^m$$

### Case 4: $X(x) = e^{ax} V(x)$ (Exponential Shift)
$$\frac{1}{f(D)} [e^{ax} V] = e^{ax} \frac{1}{f(D + a)} V$$

---

## 4. Method of Variation of Parameters
This method is used to find the particular integral for equations of the form:
$$y'' + P y' + Q y = X$$
where $P, Q$ are constants and $X$ is any function of $x$ (such as $\tan x, \sec x, \csc x, \frac{1}{1 + e^x}$).

### Steps:
1. Find the complementary function:
   $$y_c = c_1 y_1 + c_2 y_2$$
2. Compute the **Wronskian ($W$)**:
   $$W = \begin{vmatrix} y_1 & y_2 \\ y_1' & y_2' \end{vmatrix} = y_1 y_2' - y_2 y_1' \quad (W \neq 0)$$
3. The particular integral is:
   $$y_p = A(x) y_1 + B(x) y_2$$
   where:
   $$A(x) = -\int \frac{y_2 X}{W} dx, \quad B(x) = \int \frac{y_1 X}{W} dx$$
4. General solution: $y = y_c + y_p$.

---

## 5. Cauchy's and Legendre's Linear Differential Equations

### Cauchy's Homogeneous Linear Equation:
$$x^n \frac{d^n y}{dx^n} + a_1 x^{n-1} \frac{d^{n-1}y}{dx^{n-1}} + \dots + a_n y = X(x)$$

**Transformation**:
- Substitute $x = e^t \implies t = \ln x$.
- $x \frac{dy}{dx} = D y$, where $D = \frac{d}{dt}$.
- $x^2 \frac{d^2y}{dx^2} = D(D - 1)y$.
- $x^3 \frac{d^3y}{dx^3} = D(D - 1)(D - 2)y$.
This transforms the variable coefficient equation into a standard linear equation with constant coefficients in $t$.

### Legendre's Linear Equation:
$$(ax + b)^n \frac{d^n y}{dx^n} + \dots + k y = X(x)$$
Substitute $ax + b = e^t \implies t = \ln(ax + b)$, with $(ax + b) \frac{dy}{dx} = a D y$ and $(ax + b)^2 \frac{d^2y}{dx^2} = a^2 D(D - 1)y$.
