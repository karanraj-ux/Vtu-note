# Module 1: Calculus — Polar Curves & Radius of Curvature

## VTU Syllabus Code: 1BMATS101 / BMATS101
**Course**: Mathematics for Computer Science & Engineering (Calculus & Linear Algebra)  
**Module Weightage**: 20 Marks in VTU Examination

---

## 1. Polar Curves & Coordinate Systems
In the polar coordinate system, a point $P$ is represented as $(r, \theta)$, where:
- $r$ is the **radius vector** (distance from the pole $O$ to $P$).
- $\theta$ is the **vectorial angle** (angle made by the radius vector with the initial line $OX$).

### Angle Between Radius Vector and Tangent ($\phi$)
Let $\psi$ be the angle made by the tangent to the curve $r = f(\theta)$ at point $P$ with the initial line. Then:
$$\psi = \theta + \phi$$
where $\phi$ is the angle between the radius vector $OP$ and the tangent at $P$.

$$\tan \phi = r \frac{d\theta}{dr} = \frac{r}{\frac{dr}{d\theta}} = \frac{r}{r'}$$

Alternatively, taking the natural logarithm:
$$\ln r = \ln f(\theta) \implies \frac{1}{r} \frac{dr}{d\theta} = \cot \phi$$

### Worked Example: Find $\phi$ for $r = a(1 + \cos \theta)$ (Cardioid)
**Solution**:
1. Take natural logarithm of both sides:
   $$\ln r = \ln a + \ln(1 + \cos \theta)$$
2. Differentiate with respect to $\theta$:
   $$\frac{1}{r}\frac{dr}{d\theta} = \frac{-\sin \theta}{1 + \cos \theta} = \frac{-2 \sin(\theta/2)\cos(\theta/2)}{2 \cos^2(\theta/2)} = -\tan(\theta/2)$$
3. We know $\cot \phi = \frac{1}{r}\frac{dr}{d\theta}$:
   $$\cot \phi = -\tan(\theta/2) = \cot\left(\frac{\pi}{2} + \frac{\theta}{2}\right) \implies \mathbf{\phi = \frac{\pi}{2} + \frac{\theta}{2}}$$

---

## 2. Angle of Intersection of Two Polar Curves
Let two curves $r = f_1(\theta)$ and $r = f_2(\theta)$ intersect at point $P(r, \theta)$.
Let $\phi_1$ and $\phi_2$ be the angles between the radius vector and the tangents to the two curves at $P$.

The angle of intersection between the two curves is:
$$\theta_{\text{intersect}} = |\phi_1 - \phi_2|$$

### Orthogonality Condition
Two curves cut each other **orthogonally** (at right angles, $90^\circ$) if:
$$|\phi_1 - \phi_2| = \frac{\pi}{2} \iff \tan \phi_1 \cdot \tan \phi_2 = -1 \iff \cot \phi_1 \cdot \cot \phi_2 = -1$$

---

## 3. Pedal Equation ($p-r$ Equation)
The pedal equation of a curve is a relation between $r$ (radius vector) and $p$ (the perpendicular distance from the pole to the tangent).

$$p = r \sin \phi$$

### Steps to Find the Pedal Equation
1. For given $r = f(\theta)$, find $\cot \phi$ or $\tan \phi$.
2. Use $p = r \sin \phi \implies \frac{1}{p^2} = \frac{1}{r^2 \sin^2 \phi} = \frac{1}{r^2}(1 + \cot^2 \phi)$.
3. Substitute $\cot \phi = \frac{1}{r} \frac{dr}{d\theta}$ and eliminate $\theta$ using the given curve equation.

---

## 4. Curvature and Radius of Curvature ($\rho$)

**Curvature ($\kappa$)** measures the rate at which a curve changes direction with respect to arc length $s$:
$$\kappa = \frac{d\psi}{ds}$$

The **Radius of Curvature ($\rho$)** is the reciprocal of curvature:
$$\rho = \frac{1}{\kappa} = \frac{ds}{d\psi}$$

### A. Cartesian Formula: $y = f(x)$
$$\rho = \frac{\left(1 + y_1^2\right)^{3/2}}{y_2}$$
where $y_1 = \frac{dy}{dx}$ and $y_2 = \frac{d^2y}{dx^2}$.

### B. Parametric Formula: $x = x(t),\; y = y(t)$
$$\rho = \frac{\left(\dot{x}^2 + \dot{y}^2\right)^{3/2}}{\dot{x}\ddot{y} - \dot{y}\ddot{x}}$$

### C. Polar Formula: $r = f(\theta)$
$$\rho = \frac{\left(r^2 + r_1^2\right)^{3/2}}{r^2 + 2r_1^2 - r r_2}$$
where $r_1 = \frac{dr}{d\theta}$ and $r_2 = \frac{d^2r}{d\theta^2}$.

### D. Pedal Formula: $p = f(r)$
$$\rho = r \frac{dr}{dp}$$

---

## 5. Important Standard Results & Exam Formulas
| Curve | Equation | Radius of Curvature $\rho$ |
|---|---|---|
| Circle | $x^2 + y^2 = a^2$ | $a$ |
| Catenary | $y = c \cosh(x/c)$ | $\frac{y^2}{c}$ |
| Cycloid | $x = a(\theta - \sin \theta),\; y = a(1 - \cos \theta)$ | $4a \cos(\theta/2)$ |
| Cardioid | $r = a(1 + \cos \theta)$ | $\frac{2}{3} \sqrt{2ar}$ |
| Lemniscate | $r^2 = a^2 \cos 2\theta$ | $\frac{a^2}{3r}$ |
