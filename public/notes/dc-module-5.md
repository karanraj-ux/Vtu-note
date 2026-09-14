# Module 5: Spread Spectrum Modulation

## 1. What is Spread Spectrum?
Traditional modulation techniques aim to minimize bandwidth. Spread spectrum intentionally spreads the transmitted signal over a bandwidth much larger than the minimum required for the data rate.

*   **Why spread the signal?**
    *   **Interference Rejection:** Highly resistant to narrow-band jamming (intentional or unintentional).
    *   **Secure Communications:** The signal resembles background noise to unauthorized listeners (low probability of intercept).
    *   **Multiple Access (CDMA):** Allows multiple users to share the same frequency band simultaneously.
    *   **Multipath Mitigation:** Can resolve and combine multipath signals.

## 2. Pseudo-Noise (PN) Sequences
The spreading is achieved using a pseudo-random code sequence known to both the transmitter and receiver.
*   **Properties of PN Sequences:**
    *   Appear random but are deterministic and repeatable.
    *   Have a balance of 1s and 0s.
    *   Have specific autocorrelation properties (high peak at zero shift, low elsewhere).
*   **Generation:** Typically generated using Linear Feedback Shift Registers (LFSRs).

## 3. Direct Sequence Spread Spectrum (DSSS)
*   **Mechanism:** The baseband data signal is multiplied directly by a high-rate PN sequence (the "chipping" code).
*   The chip rate is much higher than the data bit rate, causing the spectrum to spread.
*   **Receiver:** The received signal is multiplied by a synchronized replica of the PN sequence (despreading), which recovers the original data and spreads any narrow-band interference.
*   **Example:** Used in GPS and 802.11b Wi-Fi.

## 4. Frequency Hopping Spread Spectrum (FHSS)
*   **Mechanism:** The carrier frequency of the modulated signal is rapidly changed (hopped) across a wide range of frequencies, dictated by the PN sequence.
*   **Slow Hopping:** Multiple data symbols are transmitted per hop.
*   **Fast Hopping:** The frequency hops multiple times per data symbol.
*   **Advantage:** Avoids interference by not staying on a jammed frequency for long.
*   **Example:** Used in Bluetooth.

## 5. Code Division Multiple Access (CDMA)
*   A multiple-access scheme based on spread spectrum.
*   Multiple users transmit in the same frequency band at the same time.
*   Each user is assigned a unique, nearly orthogonal PN code.
*   The receiver uses the specific code for the desired user to despread and recover their signal, while other users' signals appear as background noise.
