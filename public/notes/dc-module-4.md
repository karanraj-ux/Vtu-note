# Module 4: Error Control Coding

## 1. Introduction to Error Control
Due to noise in the communication channel, errors will inevitably occur. Error control coding (channel coding) adds controlled redundancy to the transmitted data to detect or correct these errors.

*   **Shannon's Second Theorem (Channel Coding Theorem):** If the transmission rate $R$ is less than the channel capacity $C$, there exists a coding scheme that can achieve an arbitrarily small error probability.

## 2. Types of Codes
1.  **Block Codes:** The encoder takes a block of $k$ message bits and adds $n-k$ parity bits to form an $n$-bit codeword. (e.g., $(n,k)$ code).
2.  **Convolutional Codes:** The encoder operates on a continuous stream of data. The output depends not only on the current input but also on previous inputs (memory).

## 3. Linear Block Codes
*   **Linearity:** The modulo-2 sum (XOR) of any two valid codewords is also a valid codeword.
*   **Generator Matrix ($G$):** Used to generate codewords: $C = M \cdot G$.
*   **Parity Check Matrix ($H$):** Used to check if a received word is valid. $C \cdot H^T = 0$ for all valid codewords $C$.
*   **Syndrome ($S$):** Calculated at the receiver: $S = R \cdot H^T$. If $S=0$, no error is detected. If $S \neq 0$, the syndrome is used to identify the error pattern.
*   **Hamming Distance:** The number of bit positions in which two codewords differ. The minimum Hamming distance ($d_{min}$) of a code determines its error-detecting and error-correcting capabilities.
    *   Detects up to $d_{min} - 1$ errors.
    *   Corrects up to $\lfloor(d_{min} - 1)/2\rfloor$ errors.

## 4. Cyclic Codes
A subclass of linear block codes where any cyclic shift of a valid codeword is also a valid codeword.
*   Represented using polynomials (e.g., $1011$ becomes $1 + x^2 + x^3$).
*   Generated using a generator polynomial $g(x)$.
*   Easy to implement using shift registers.
*   CRC (Cyclic Redundancy Check) is a highly common error-detecting cyclic code.

## 5. Convolutional Codes
*   Characterized by $(n, k, m)$, where $m$ is the memory order.
*   **Encoding:** Implemented using shift registers and modulo-2 adders.
*   **Decoding:** Typically uses the **Viterbi Algorithm**, which performs maximum likelihood decoding by finding the most probable path through a state diagram (trellis) representing the code.
