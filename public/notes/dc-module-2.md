# Module 2: Bandpass Data Transmission

## 1. Introduction
When transmitting over channels like wireless links or optical fibers, baseband signals must be shifted to a higher frequency range. This is bandpass transmission or digital carrier modulation.

## 2. Digital Modulation Techniques
The three basic characteristics of a carrier wave (amplitude, frequency, phase) can be varied to represent digital data.

### Amplitude Shift Keying (ASK)
*   **Concept:** The amplitude of the carrier is switched between two or more levels depending on the digital input.
*   **OOK (On-Off Keying):** Simplest form where 1 is the presence of a carrier and 0 is its absence.
*   **Vulnerability:** Highly susceptible to noise and amplitude variations.

### Frequency Shift Keying (FSK)
*   **Concept:** The frequency of the carrier is switched between two values (for Binary FSK) representing 1 and 0.
*   **Detection:** Can be coherent (requires phase synchronization) or non-coherent (using envelope detectors).
*   **Advantage:** More robust against amplitude noise than ASK.

### Phase Shift Keying (PSK)
*   **Concept:** The phase of the carrier is shifted to represent data.
*   **BPSK (Binary PSK):** Two phases, typically 0 and 180 degrees.
*   **QPSK (Quadrature PSK):** Four phases, allowing 2 bits per symbol, doubling the data rate for the same bandwidth compared to BPSK.
*   **Performance:** Generally provides the best error performance for a given signal-to-noise ratio among the basic techniques.

## 3. Quadrature Amplitude Modulation (QAM)
*   Combines both amplitude and phase modulation.
*   Allows for high spectral efficiency (more bits per second per Hertz).
*   Examples: 16-QAM, 64-QAM (used in modern Wi-Fi and LTE).

## 4. Coherent vs. Non-Coherent Detection
*   **Coherent Detection:** The receiver must generate a local carrier that is perfectly synchronized in frequency and phase with the received carrier. Offers better performance but is more complex.
*   **Non-Coherent Detection:** Does not require phase synchronization. Simpler to implement but requires a higher signal-to-noise ratio to achieve the same error rate. Differential PSK (DPSK) is a common non-coherent technique.
