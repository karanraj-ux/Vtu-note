# Module 2: Lasers & Optical Fibers

## VTU Syllabus Code: BPHYS102 / 202
**Course**: Applied Physics for CSE / Engineering Streams  
**Module Weightage**: 20 Marks in Semester End Examination

---

## 1. Principles of Lasers
**LASER**: Light Amplification by Stimulated Emission of Radiation.

### Key Characteristics of Laser Light:
1. **High Monochromaticity**: Extremely narrow spectral linewidth ($\Delta\lambda \approx 10^{-3}\text{ Å}$).
2. **High Coherence**: Temporal coherence (phase correlation over time) and spatial coherence (phase correlation across wavefront).
3. **High Directionality**: Negligible beam divergence ($\theta \approx 10^{-3}\text{ rad}$).
4. **High Intensity / Brightness**: High photon flux per unit area per unit solid angle.

---

## 2. Interaction of Radiation with Matter & Einstein's Coefficients
Let $N_1$ and $N_2$ be the population densities in ground state $E_1$ and excited state $E_2$, and $\rho(\nu)$ be the radiation energy density at frequency $\nu$:

1. **Induced / Stimulated Absorption**:
   $$R_{\text{abs}} = B_{12} N_1 \rho(\nu)$$
   where $B_{12}$ is Einstein's coefficient of stimulated absorption.

2. **Spontaneous Emission**:
   $$R_{\text{spont}} = A_{21} N_2$$
   where $A_{21}$ is Einstein's coefficient of spontaneous emission (incoherent photons, random direction and phase).

3. **Stimulated Emission**:
   $$R_{\text{stim}} = B_{21} N_2 \rho(\nu)$$
   where $B_{21}$ is Einstein's coefficient of stimulated emission (identical frequency, phase, direction, and polarization as incident photon).

### Einstein's Relations:
At thermal equilibrium, rate of absorption = rate of emission:
$$B_{12} N_1 \rho(\nu) = A_{21} N_2 + B_{21} N_2 \rho(\nu)$$
Using Boltzmann distribution $\frac{N_2}{N_1} = e^{-\frac{h\nu}{k_B T}}$ and Planck's radiation law $\rho(\nu) = \frac{8\pi h\nu^3}{c^3}\frac{1}{e^{\frac{h\nu}{k_B T}} - 1}$:
1. **$B_{12} = B_{21}$**: Probability of stimulated absorption equals probability of stimulated emission.
2. **$\frac{A_{21}}{B_{21}} = \frac{8\pi h\nu^3}{c^3}$**: Ratio of spontaneous to stimulated emission is proportional to $\nu^3$.

---

## 3. Essential Conditions for Lasing Action
1. **Population Inversion ($N_2 > N_1$)**: Number of atoms in the higher energy state exceeds that in the lower state.
2. **Metastable State**: An excited atomic state with a long lifetime ($\approx 10^{-3}\text{ s}$ compared to normal excited state lifetime of $10^{-8}\text{ s}$), allowing atoms to accumulate.
3. **Pumping**: External energy supply to lift atoms from ground to higher levels (Optical, Electrical discharge, Chemical, Direct injection).
4. **Optical Resonator Cavity**: Pair of mirrors (one $100\%$ reflecting, one partially transmitting $\approx 98\%$) providing positive feedback and wavelength selection ($L = \frac{m\lambda}{2}$).

---

## 4. Engineering Laser Systems
### Carbon Dioxide ($\text{CO}_2$) Molecular Gas Laser:
- **Active Medium**: Mixture of $\text{CO}_2$, $\text{N}_2$, and $\text{He}$ in ratio $1:2:4$.
- **Wavelength**: $10.6\ \mu\text{m}$ (Far Infrared).
- **Vibrational Modes of $\text{CO}_2$**:
  - Symmetric stretch mode $(100)$
  - Bending mode $(010)$
  - Asymmetric stretch mode $(001)$
- **Working**: $\text{N}_2$ molecules excited by electron collision transfer energy resonantly to $\text{CO}_2$ asymmetric stretch level $(001)$. Transitions to $(100)$ emit $10.6\ \mu\text{m}$ and to $(020)$ emit $9.6\ \mu\text{m}$. Helium facilitates cooling and depopulating lower levels.

### Semiconductor Diode Laser (GaAs / InP):
- Direct bandgap semiconductor $p-n$ junction heavily doped ($n^+, p^+$).
- Forward bias creates high injection of electrons and holes across junction.
- Recombination across direct bandgap emits coherent photons ($h\nu \approx E_g$).
- Used extensively in optical fiber telecommunications.

---

## 5. Optical Fibers: Structure & Total Internal Reflection
An optical fiber consists of:
1. **Core**: Inner high refractive index medium ($n_1$).
2. **Cladding**: Surrounding layer with lower refractive index ($n_2 < n_1$) to ensure total internal reflection.
3. **Buffer Coating / Jacket**: Polymer protective layer against moisture and mechanical abrasion.

### Critical Angle of Total Internal Reflection:
$$\sin \theta_c = \frac{n_2}{n_1} \implies \theta_c = \sin^{-1}\left(\frac{n_2}{n_1}\right)$$

---

## 6. Numerical Aperture (NA) & Acceptance Angle ($\theta_0$)
- **Acceptance Angle ($\theta_0$)**: Maximum launch angle in air for which total internal reflection occurs inside core.
- **Numerical Aperture (NA)**: Light gathering power of fiber.

$$\mathbf{\text{NA} = \sin \theta_0 = \sqrt{n_1^2 - n_2^2} \approx n_1 \sqrt{2\Delta}}$$
where $\Delta = \frac{n_1 - n_2}{n_1}$ is the **fractional refractive index difference**.

### Acceptance Cone Angle:
$$2\theta_0 = 2\sin^{-1}\left(\sqrt{n_1^2 - n_2^2}\right)$$

---

## 7. Fiber Classification & Attenuation Mechanisms
1. **By Index Profile**:
   - **Step Index Fiber**: Constant core index, sharp step transition to cladding. High intermodal dispersion.
   - **Graded Index (GRIN) Fiber**: Parabolic index profile $n(r) = n_1\sqrt{1 - 2\Delta(r/a)^2}$. Rays bend smoothly, equalizing transit times and minimizing modal dispersion.

2. **By Number of Modes**:
   - **Single Mode Fiber (SMF)**: Core diameter $8-10\ \mu\text{m}$, zero intermodal dispersion, used for long-haul internet backbones.
   - **Multimode Fiber (MMF)**: Core diameter $50-62.5\ \mu\text{m}$, higher modal dispersion, used for campus LANs.

### Attenuation (Fiber Loss in dB/km):
$$\alpha = \frac{10}{L} \log_{10}\left(\frac{P_{\text{in}}}{P_{\text{out}}}\right)\ \text{dB/km}$$
Causes: Rayleigh scattering ($\propto \frac{1}{\lambda^4}$), absorption (OH- ion impurity bands), and macro/micro-bending.
