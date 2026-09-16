# Module 1: Energy Storage Systems & Battery Technology

## VTU Syllabus Code: BCHES102 / 202
**Course**: Applied Chemistry for CSE / Engineering Streams  
**Module Weightage**: 20 Marks in Semester End Examination

---

## 1. Principles of Electrochemical Cells & Batteries
A battery is an electrochemical assembly containing one or more electrochemical cells converting stored chemical energy directly into electrical energy via spontaneous reduction-oxidation (redox) reactions.

### Key Battery Terminology:
1. **Electromotive Force (EMF) / Cell Potential ($E_{\text{cell}}$)**:
   $$E_{\text{cell}}^\circ = E_{\text{cathode}}^\circ - E_{\text{anode}}^\circ$$
2. **Specific Energy (Gravimetric Energy Density)**: Watt-hours per kilogram ($\text{Wh/kg}$).
3. **Specific Power**: Maximum rate of energy release per kilogram ($\text{W/kg}$).
4. **Capacity ($C$)**: Total Ampere-hours ($\text{Ah}$) delivered:
   $$C = \int I \, dt = \frac{n F W}{M}$$
   where $F = 96485\text{ C/mol}$, $W$ is active material mass, and $M$ is molar mass.

---

## 2. Modern Lithium-Ion Batteries (Li-ion)
Used universally in smartphones, laptops, and electric vehicles (EVs).

### Construction:
- **Anode**: Graphitic carbon intercalated with lithium ($\text{Li}_x\text{C}_6$).
- **Cathode**: Lithium cobalt oxide ($\text{LiCoO}_2$), lithium iron phosphate ($\text{LiFePO}_4$), or NMC ($\text{LiNi}_{1/3}\text{Mn}_{1/3}\text{Co}_{1/3}\text{O}_2$).
- **Electrolyte**: Lithium hexafluorophosphate ($\text{LiPF}_6$) dissolved in non-aqueous organic solvents (Ethylene carbonate + Dimethyl carbonate).
- **Separator**: Microporous polyethylene/polypropylene membrane.

### Electrochemical Reactions:
- **Discharge at Anode (Oxidation)**:
  $$\text{Li}_x\text{C}_6 \xrightarrow{\text{discharge}} \text{C}_6 + x\text{Li}^+ + x e^-$$
- **Discharge at Cathode (Reduction)**:
  $$\text{Li}_{1-x}\text{CoO}_2 + x\text{Li}^+ + x e^- \xrightarrow{\text{discharge}} \text{LiCoO}_2$$
- **Net Cell Reaction**:
  $$\text{Li}_x\text{C}_6 + \text{Li}_{1-x}\text{CoO}_2 \underset{\text{charge}}{\overset{\text{discharge}}{\rightleftharpoons}} \text{C}_6 + \text{LiCoO}_2 \quad (E_{\text{cell}} \approx 3.7\text{ V})$$

### Advantages:
High operating cell voltage ($3.7\text{ V}$ vs $1.2\text{ V}$ of Ni-Cd), zero memory effect, low self-discharge ($< 2\%$ per month), high cycle life ($> 1500$ cycles).

---

## 3. Sodium-Ion Batteries (Na-ion): Next-Generation Alternative
Abundance of Sodium ($2.8\%$ in earth's crust vs $0.002\%$ for Lithium) makes Na-ion batteries cost-effective:
- **Cathode**: Prussian white or layered transition metal oxides ($\text{NaMnO}_2, \text{Na}_x\text{CoO}_2$).
- **Anode**: Hard carbon (graphite cannot intercalate larger $\text{Na}^+$ ions effectively).
- **Electrolyte**: $\text{NaPF}_6$ or $\text{NaClO}_4$ in organic alkyl carbonates.
- Operating voltage: $2.8 - 3.2\text{ V}$.

---

## 4. Fuel Cells: Hydrogen-Oxygen Proton Exchange Membrane (PEMFC)
A galvanic cell in which reactants are continuously supplied from an external source to generate electrical power.

### Construction of PEM Fuel Cell:
- **Anode & Cathode Catalysts**: Nanoporous Platinum supported on carbon black.
- **Electrolyte**: Solid perfluorosulfonic acid polymer membrane (**Nafion**), permeable strictly to protons ($\text{H}^+$).

### Electrode Reactions:
- **Anode Reaction (Oxidation)**:
  $$2\text{H}_2 \to 4\text{H}^+ + 4e^- \quad (E^\circ = 0.00\text{ V})$$
- **Cathode Reaction (Reduction)**:
  $$\text{O}_2 + 4\text{H}^+ + 4e^- \to 2\text{H}_2\text{O} \quad (E^\circ = +1.23\text{ V})$$
- **Overall Reaction**:
  $$2\text{H}_2 + \text{O}_2 \to 2\text{H}_2\text{O} \quad (E_{\text{cell}}^\circ = 1.23\text{ V})$$

### Theoretical Thermodynamic Efficiency:
$$\eta = \frac{\Delta G^\circ}{\Delta H^\circ} \times 100\% = \frac{-237.2\text{ kJ/mol}}{-285.8\text{ kJ/mol}} \times 100\% \approx 83\%$$
Exceeds Carnot cycle thermodynamic limitation since combustion is bypassed.

---

## 5. Supercapacitors (Ultracapacitors)
Store electrical energy via electrostatic charge accumulation (Electrochemical Double Layer Capacitance - EDLC) or reversible fast faradaic surface redox reactions (Pseudocapacitance).
- **Electrodes**: High-surface-area activated carbon or graphene ($> 2000\text{ m}^2/\text{g}$).
- Extremely high power density ($> 10,000\text{ W/kg}$), ultra-fast charge time (seconds), cycle life $> 500,000$ cycles. Used in regenerative braking and hybrid buses.
