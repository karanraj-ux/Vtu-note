# Module 2: Corrosion Science & Metal Finishing

## VTU Syllabus Code: BCHES102 / 202
**Course**: Applied Chemistry for Engineering Streams  
**Module Weightage**: 20 Marks in Semester End Examination

---

## 1. Electrochemical Theory of Corrosion

Corrosion is defined as the spontaneous deterioration and degradation of a metal or alloy through chemical or electrochemical reaction with its surrounding environmental medium.

### Mechanism (Rusting of Iron in Aerated Medium):
1. **Anodic Reaction (Oxidation)**:
   Metal atoms lose electrons and dissolve as metal cations into the moisture film:
   $$\text{Fe} \to \text{Fe}^{2+} + 2e^- \quad (E^\circ = -0.44\text{ V})$$

2. **Cathodic Reaction (Reduction)**:
   - **In Neutral or Slightly Alkaline Aerated Medium (Oxygen Absorption Mechanism)**:
     $$\text{O}_2 + 2\text{H}_2\text{O} + 4e^- \to 4\text{OH}^-$$
   - **In Acidic Deaerated Medium (Hydrogen Evolution Mechanism)**:
     $$2\text{H}^+ + 2e^- \to \text{H}_2 \uparrow$$

3. **Overall Precipitation**:
   $$\text{Fe}^{2+} + 2\text{OH}^- \to \text{Fe(OH)}_2$$
   Further oxidation in atmospheric oxygen yields hydrated ferric oxide (Rust):
   $$4\text{Fe(OH)}_2 + \text{O}_2 + 2\text{H}_2\text{O} \to 2\text{Fe}_2\text{O}_3 \cdot 3\text{H}_2\text{O}$$

---

## 2. Types of Corrosion

### A. Galvanic Corrosion (Bimetallic Corrosion)
Occurs when two dissimilar metals with different electrode potentials are in physical or electrical contact in an electrolytic medium.
- The metal with the more negative standard electrode potential acts as the **anode** and corrodes preferentially.
- Example: In an iron-copper contact, Iron ($E^\circ = -0.44\text{ V}$) acts as anode and corrodes rapidly; Copper ($E^\circ = +0.34\text{ V}$) is cathode and remains protected.

### B. Differential Aeration Corrosion
Occurs when a metallic surface is exposed to non-uniform concentrations of dissolved oxygen.
- **Rule**: The portion of the metal exposed to **lower oxygen concentration** acts as the **anode** and undergoes corrosion.
- The portion exposed to **higher oxygen concentration** acts as the **cathode**.
- Classic Examples:
  1. **Waterline Corrosion**: Just below the waterline in storage tanks, oxygen concentration is lower $\to$ intense corrosion groove forms right below the meniscus.
  2. **Pitting Corrosion**: Under dirt, dust, or droplet deposits where oxygen access is restricted.

---

## 3. Corrosion Control & Cathodic Protection

### 1. Sacrificial Anode Method
The metallic structure to be protected (pipeline, ship hull) is connected electrically via an insulated copper cable to a more electroactive metal (Magnesium, Zinc, or Aluminum).
- The sacrificial metal corrodes preferentially, supplying electrons to the structure.
- When consumed, the sacrificial anode is replaced periodically.

### 2. Impressed Current Cathodic Protection (ICCP)
An external DC power supply connects the structure to an insoluble auxiliary anode (Graphite, Platinized Titanium, Silicon-iron).
- Negative terminal connects to the steel pipeline (cathode).
- Positive terminal connects to buried auxiliary anodes.

---

## 4. Electroless Plating (PCB Manufacturing)

Electroless plating is the auto-catalytic chemical reduction of metal ions from an aqueous solution onto a catalytically active substrate without passing an external electrical current.

### Electroless Plating of Copper on Printed Circuit Boards (PCBs):
- **Bath Composition**:
  - Coating Salt: Copper Sulfate ($\text{CuSO}_4 \cdot 5\text{H}_2\text{O}$)
  - Reducing Agent: Formaldehyde ($\text{HCHO}$)
  - Complexing Agent: EDTA or Rochelle salt (prevents precipitation of $\text{Cu(OH)}_2$)
  - pH Adjuster: $\text{NaOH}$ (maintains operating pH $11.5 - 12.5$)
- **Operating Temperature**: $55 - 65^\circ\text{C}$
- **Overall Redox Reaction**:
  $$\text{Cu}^{2+} + 2\text{HCHO} + 4\text{OH}^- \xrightarrow{\text{Pd catalyst}} \text{Cu} \downarrow + 2\text{HCOO}^- + 2\text{H}_2\text{O} + \text{H}_2 \uparrow$$
- **Engineering Application**: Produces uniform conductive through-hole metallization on double-sided and multilayer printed circuit boards.
