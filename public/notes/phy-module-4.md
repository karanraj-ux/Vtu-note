# Module 4: Semiconductor Physics & Display Devices

## VTU Syllabus Code: BPHYS102 / 202
**Course**: Applied Physics for CSE / Engineering Streams  
**Module Weightage**: 20 Marks in Semester End Examination

---

## 1. Energy Bands in Solids & Fermi-Dirac Distribution
Based on Kronig-Penney model and Bloch theorem:
- **Valence Band (VB)**: Highest filled energy band at $0\text{ K}$.
- **Conduction Band (CB)**: Lowest unfilled or partially filled band.
- **Forbidden Energy Gap ($E_g$)**:
  - Insulators: $E_g > 3-5\text{ eV}$
  - Semiconductors: $0.1\text{ eV} < E_g < 3.0\text{ eV}$ (Silicon: $1.12\text{ eV}$, Germanium: $0.67\text{ eV}$, GaAs: $1.42\text{ eV}$)
  - Metals: Overlapping VB and CB ($E_g = 0$)

### Fermi-Dirac Distribution Function $f(E)$:
Probability that an available quantum energy state $E$ is occupied by an electron at temperature $T$:
$$f(E) = \frac{1}{1 + e^{\frac{E - E_F}{k_B T}}}$$
- At $T = 0\text{ K}$: $f(E) = 1$ for $E < E_F$, and $f(E) = 0$ for $E > E_F$.
- At $T > 0\text{ K}$: At $E = E_F$, $f(E_F) = \frac{1}{2} = 50\%$ probability of occupation.

---

## 2. Intrinsic vs Extrinsic Semiconductors
### Intrinsic Carrier Concentration ($n_i$):
$$n = p = n_i = 2 \left(\frac{2\pi k_B T}{h^2}\right)^{3/2} (m_e^* m_h^*)^{3/4} e^{-\frac{E_g}{2k_B T}}$$
Intrinsic Fermi Level position:
$$E_{Fi} = \frac{E_c + E_v}{2} + \frac{3}{4}k_B T \ln\left(\frac{m_h^*}{m_e^*}\right) \approx \frac{E_g}{2} \quad \text{(midway in bandgap)}$$

### Extrinsic Semiconductors:
- **n-type**: Doped with pentavalent donors ($P, As, Sb$). Fermi level shifts upwards toward conduction band:
  $$E_F = E_c - k_B T \ln\left(\frac{N_c}{N_d}\right)$$
- **p-type**: Doped with trivalent acceptors ($B, Al, In$). Fermi level shifts downwards toward valence band:
  $$E_F = E_v + k_B T \ln\left(\frac{N_v}{N_a}\right)$$

### Law of Mass Action:
Under thermal equilibrium, regardless of doping:
$$n \cdot p = n_i^2$$

---

## 3. Hall Effect & Its Engineering Significance
When a magnetic field $B_z$ is applied perpendicular to a current-carrying conductor ($I_x$), a transverse electric field and potential difference ($V_H$) develop across opposite faces:

$$\mathbf{V_H = \frac{I B}{w \cdot n q} = \frac{R_H I B}{w}}$$
where:
- **Hall Coefficient ($R_H$)**:
  $$R_H = \frac{1}{n e} \quad (\text{for electrons, negative}), \quad R_H = \frac{1}{p e} \quad (\text{for holes, positive})$$
- **Hall Mobility ($\mu_H$)**: $\mu = \sigma |R_H|$

### Practical Applications of Hall Effect:
1. Determine the **sign and type of charge carriers** ($p$-type vs $n$-type).
2. Calculate the **carrier concentration** ($n$ or $p = \frac{1}{e |R_H|}$).
3. Measure **carrier drift mobility** ($\mu = \sigma R_H$).
4. Hall effect magnetic field sensors in automotive wheel speed sensors, brushless DC motors, and contactless current clamps.

---

## 4. Modern Optoelectronic & Display Devices
1. **Light Emitting Diodes (LEDs)**:
   - Direct bandgap semiconductors (GaAsP, InGaN, AlGaInP) emit photons of energy $h\nu \approx E_g$ under forward bias.
   - Emission wavelength: $\lambda = \frac{hc}{E_g} = \frac{1.24}{E_g\text{ (eV)}}\ \mu\text{m}$.
2. **Organic LEDs (OLEDs)**:
   - Thin organic electroluminescent films (Alq3, PEDOT:PSS) sandwiched between anode (ITO) and cathode.
   - Self-emissive, true blacks, flexible display substrates.
3. **Liquid Crystal Displays (LCDs)**:
   - Nematic liquid crystals sandwiched between crossed polarizers. Applied voltage untwists molecular director, modulating light transmission from backlight.
