# Module 1: Signal Spaces and Baseband Transmission

## 1. Geometric Representation of Signals
Digital communication involves transmitting digital information over a physical channel. A key concept is representing signals as vectors in a geometric space.

*   **Gram-Schmidt Orthogonalization Procedure:** A method to convert a set of energy signals into a set of orthogonal basis functions.
    *   This allows any signal in the set to be represented as a linear combination of these basis functions.
    *   The signals can then be plotted as points in a signal space diagram (constellation diagram).
*   **Distance Metrics:** The Euclidean distance between points in the signal space is directly related to the probability of error in the presence of noise.

## 2. Baseband Transmission
Baseband transmission sends digital data over a channel without modulating it onto a higher frequency carrier.

*   **Line Codes (Digital Baseband Modulation):**
    *   **Unipolar NRZ (Non-Return to Zero):** 1 is represented by a positive voltage, 0 by zero voltage.
    *   **Polar NRZ:** 1 is positive voltage, 0 is negative voltage.
    *   **Bipolar RZ (Return to Zero):** 1 is positive or negative voltage returning to zero in the middle of the bit period, 0 is zero voltage.
    *   **Manchester Encoding:** 1 is a high-to-low transition, 0 is a low-to-high transition. Self-clocking.

## 3. Intersymbol Interference (ISI)
When a signal is transmitted over a band-limited channel, the pulses spread out in time and can interfere with adjacent pulses. This is called ISI.

*   **Nyquist Criterion for Zero ISI:** Provides the theoretical minimum bandwidth required to transmit at a given symbol rate without ISI.
*   **Raised Cosine Filter:** A practical pulse-shaping filter that satisfies the Nyquist criterion and minimizes ISI, parameterized by the roll-off factor ($\alpha$).

## 4. Eye Pattern
An oscilloscope display that allows visual inspection of digital signals to evaluate the effects of ISI and noise.
*   **Eye Opening:** Indicates the immunity to noise.
*   **Eye Closure:** Indicates severe ISI.
*   **Width of the Eye:** Defines the time interval over which the received wave can be sampled without error.
