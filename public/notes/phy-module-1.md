# Module 1: Quantum Mechanics & Wave-Particle Duality

## VTU Syllabus Code: BPHYS102 / 202
**Course**: Applied Physics for CSE / Engineering Streams  
**Module Weightage**: 20 Marks in Semester End Examination

---

## 1. Limitations of Classical Mechanics & Need for Quantum Mechanics
Classical mechanics (Newtonian mechanics & Maxwell's electromagnetic theory) fails to explain several microscopic phenomena:
1. **Blackbody Radiation Spectrum**: Rayleigh-Jeans law predicted infinite energy density at short wavelengths (Ultraviolet Catastrophe). Max Planck resolved this in 1900 by postulating that energy is quantized in discrete packets: $E = nh\nu$.
2. **Photoelectric Effect**: Emission of electrons by light above a threshold frequency $\nu_0$, with zero time lag, explained by Einstein ($E = h\nu = \Phi + \frac{1}{2}mv_{\text{max}}^2$).
3. **Compton Effect**: Increase in wavelength of scattered X-rays by electrons ($\Delta \lambda = \lambda' - \lambda = \frac{h}{m_0 c}(1 - \cos \theta)$).
4. **Stability of the Atom & Line Spectra**: Classical electrodynamics predicts orbiting electrons radiate energy continuously and spiral into the nucleus within $10^{-8}$ s.

---

## 2. De-Broglie Hypothesis & Dual Nature of Matter
In 1924, Louis de Broglie postulated that if light behaves as both wave and particle, material particles (like electrons, protons) in motion must also possess wave-like properties:
$$\lambda = \frac{h}{p} = \frac{h}{mv}$$

### De-Broglie Wavelength in Terms of Various Physical Quantities:
1. **In terms of Kinetic Energy ($E$ or $K$)**:
   $$E = \frac{p^2}{2m} \implies p = \sqrt{2mE} \implies \mathbf{\lambda = \frac{h}{\sqrt{2mE}}}$$

2. **For an Electron Accelerated Through Potential Difference $V$ Volts**:
   $$E = eV \implies \lambda = \frac{h}{\sqrt{2m_e eV}}$$
   Substituting $h = 6.626 \times 10^{-34}\text{ J}\cdot\text{s}$, $m_e = 9.1 \times 10^{-31}\text{ kg}$, $e = 1.6 \times 10^{-19}\text{ C}$:
   $$\mathbf{\lambda = \frac{1.227}{\sqrt{V}}\text{ nm} = \frac{12.27}{\sqrt{V}}\text{ Å}}$$

3. **In terms of Absolute Temperature ($T$) for Thermal Neutrons**:
   $$E_{\text{avg}} = \frac{3}{2} k_B T \implies \mathbf{\lambda = \frac{h}{\sqrt{3m k_B T}}}$$

---

## 3. Heisenberg's Uncertainty Principle
Formulated by Werner Heisenberg in 1927:
> "It is impossible to measure simultaneously both the position ($x$) and momentum ($p_x$) of a particle along the same axis with infinite precision."

$$\Delta x \cdot \Delta p_x \ge \frac{\hbar}{2} = \frac{h}{4\pi}$$

### Alternate Uncertainty Conjugate Pairs:
- **Energy and Time**: $\Delta E \cdot \Delta t \ge \frac{\hbar}{2}$
- **Angular Momentum and Angle**: $\Delta L \cdot \Delta \theta \ge \frac{\hbar}{2}$

### Physical Applications:
- **Non-existence of Electrons in the Atomic Nucleus**:
  Radius of nucleus $\approx 10^{-14}\text{ m}$. If electron is inside nucleus, $\Delta x \approx 2 \times 10^{-14}\text{ m}$.
  $$\Delta p \ge \frac{h}{4\pi \Delta x} \approx 2.63 \times 10^{-21}\text{ kg}\cdot\text{m/s}$$
  $$E \approx pc \approx (2.63 \times 10^{-21})(3 \times 10^8) \approx 7.89 \times 10^{-13}\text{ J} \approx 4.9\text{ MeV}$$
  $\beta$-decay experiments show electrons emitted have energies $< 4\text{ MeV}$, proving electrons cannot reside within the nucleus prior to emission.

---

## 4. Wave Function ($\Psi$) and Max Born's Interpretation
In quantum mechanics, a moving particle is described by a complex wave function $\Psi(x, y, z, t)$.
- $\Psi$ itself has no direct physical meaning.
- **Born's Statistical Interpretation**: The quantity $|\Psi|^2 = \Psi^* \Psi$ represents the **probability density** (probability of finding the particle per unit volume at position $(x, y, z)$ at time $t$).

### Normalization Condition:
Since the particle must exist somewhere in the universe:
$$\int_{-\infty}^{\infty} |\Psi(x, t)|^2 dx = 1$$

### Properties of an Acceptable Wave Function (Well-Behaved):
1. $\Psi$ must be **finite** everywhere.
2. $\Psi$ must be **single-valued** everywhere.
3. $\Psi$ and its first spatial derivative $\frac{\partial \Psi}{\partial x}$ must be **continuous** across boundaries.

---

## 5. Time-Independent Schrödinger Wave Equation (1-D)
For a particle of mass $m$ moving in a conservative potential $V(x)$:

$$\mathbf{\frac{d^2\psi}{dx^2} + \frac{2m}{\hbar^2} (E - V)\psi = 0}$$

### Derivation Steps:
1. Classical wave equation: $\frac{\partial^2 y}{\partial x^2} = \frac{1}{v^2}\frac{\partial^2 y}{\partial t^2}$
2. Solution $\Psi(x, t) = \psi(x) e^{-i\omega t}$ with $\omega = 2\pi\nu = \frac{E}{\hbar}$
3. Differentiate twice with respect to $x$: $\frac{d^2\psi}{dx^2} = -k^2 \psi = -\frac{4\pi^2}{\lambda^2}\psi$
4. By de Broglie relation $\lambda = \frac{h}{p} \implies \frac{1}{\lambda^2} = \frac{p^2}{h^2} = \frac{2m(E - V)}{h^2}$
5. Substituting yields: $\frac{d^2\psi}{dx^2} + \frac{8\pi^2 m}{h^2}(E - V)\psi = 0$, where $\hbar = \frac{h}{2\pi}$.

---

## 6. Particle in a 1-D Infinite Potential Well (Particle in a Box)
Consider an electron of mass $m$ confined inside a 1-D box of length $L$:
$$V(x) = \begin{cases} 0 & \text{for } 0 < x < L \\ \infty & \text{for } x \le 0 \text{ and } x \ge L \end{cases}$$

### Boundary Conditions:
$\psi(0) = 0$ and $\psi(L) = 0$

### Eigenvalues of Energy:
$$\mathbf{E_n = \frac{n^2 h^2}{8mL^2} = \frac{n^2 \pi^2 \hbar^2}{2mL^2}}, \quad n = 1, 2, 3, \dots$$
- Energy is **quantized** (discrete energy levels).
- Ground state energy ($n = 1$): $E_1 = \frac{h^2}{8mL^2} \neq 0$ (**Zero Point Energy**).

### Eigenfunctions (Normalized Wave Functions):
$$\mathbf{\psi_n(x) = \sqrt{\frac{2}{L}} \sin\left(\frac{n\pi x}{L}\right)}$$

---

## 7. Numerical Practice Problems
1. **Problem**: Calculate the de-Broglie wavelength of an electron moving with kinetic energy of $100\text{ eV}$.
   - **Solution**: $\lambda = \frac{1.227}{\sqrt{100}} = \frac{1.227}{10} = \mathbf{0.1227\text{ nm} = 1.227\text{ Å}}$.
2. **Problem**: An electron is trapped in an infinite potential well of width $1\text{ Å}$. Calculate the ground state energy and first excited state energy in eV.
   - $E_1 = \frac{h^2}{8mL^2} = \frac{(6.63 \times 10^{-34})^2}{8 \times 9.1 \times 10^{-31} \times (10^{-10})^2 \times 1.6 \times 10^{-19}} \approx \mathbf{37.6\text{ eV}}$.
   - $E_2 = 2^2 \times E_1 = 4 \times 37.6 = \mathbf{150.4\text{ eV}}$.
