# Module 5: Instrumental Methods of Analysis & Chemical Sensors

## VTU Syllabus Code: BCHES102 / 202
**Course**: Applied Chemistry for Engineering Streams  
**Module Weightage**: 20 Marks in Semester End Examination

---

## 1. Conductometry

Measures the electrical conductance ($G = 1/R$) of an electrolytic solution as a function of added titrant volume.

### Conductometric Titration of Strong Acid vs Strong Base ($\text{HCl}$ vs $\text{NaOH}$):
- **Initial Stage**: High conductance due to highly mobile hydronium ions ($\text{H}^+$, ionic mobility $= 349.8\ \Omega^{-1}\text{cm}^2/\text{equiv}$).
- **Addition of $\text{NaOH}$**: $\text{H}^+$ ions are replaced by slower $\text{Na}^+$ ions ($\text{mobility} = 50.11$):
  $$\text{H}^+ + \text{Cl}^- + \text{Na}^+ + \text{OH}^- \to \text{Na}^+ + \text{Cl}^- + \text{H}_2\text{O}$$
  Conductance decreases linearly down to the equivalence point.
- **After Equivalence Point**: Excess fast-moving hydroxyl ions ($\text{OH}^-$, mobility $= 198$) cause sharp linear rise in conductance.
- The intersection of the two linear segments yields the exact neutralization endpoint.

---

## 2. Potentiometry and the Glass Electrode (pH Measurement)

Measures the electromotive force ($EMF$) between an indicator electrode and a reference electrode (Saturated Calomel Electrode, SCE) at zero net current.

### Glass Electrode for pH Determination:
- **Assembly**: Thin bulb of special high-hygroscopic lithium-silicate glass ($72\%\ \text{SiO}_2, 22\%\ \text{Na}_2\text{O}, 6\%\ \text{CaO}$) filled with $0.1\text{ M HCl}$ containing an internal $\text{Ag/AgCl}$ wire.
- **Boundary Potential**:
  $$E_{\text{glass}} = E^\circ_{\text{glass}} - 0.0591 \times \text{pH} \quad (\text{at } 298\text{ K})$$
- **Total Cell EMF**:
  $$E_{\text{cell}} = E_{\text{glass}} - E_{\text{SCE}}$$
  $$\text{pH} = \frac{E^\circ_{\text{cell}} - E_{\text{cell}}}{0.0591}$$

---

## 3. Colorimetry & Beer-Lambert's Law

Used to quantify concentration of colored transition metal ions ($\text{Cu}^{2+}, \text{Fe}^{3+}$):
- **Beer's Law**: Absorbance is directly proportional to concentration ($c$).
- **Lambert's Law**: Absorbance is directly proportional to path length ($l$).
- **Combined Law**:
  $$A = \log_{10}\left(\frac{I_0}{I}\right) = \epsilon \cdot c \cdot l$$
  where $\epsilon$ is molar absorptivity ($\text{L}\cdot\text{mol}^{-1}\cdot\text{cm}^{-1}$), $c$ is concentration in $\text{mol/L}$, and $l$ is optical cuvette path length ($1\text{ cm}$).
- **Procedure for Estimation of Copper**: Prepare ammonium complex $[\text{Cu(NH}_3)_4]^{2+}$ (deep blue, $\lambda_{\max} = 620\text{ nm}$), construct calibration curve $A$ vs $c$, interpolate unknown sample.
