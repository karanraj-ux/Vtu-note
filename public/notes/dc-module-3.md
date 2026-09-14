# Module 3: Information Theory

## 1. Measure of Information
How do we quantify information? Claude Shannon established that information is related to uncertainty.

*   **Information Content ($I$):** The information content of an event $x$ with probability $P(x)$ is defined as $I(x) = \log_2(1/P(x))$.
    *   Highly probable events convey little information.
    *   Highly improbable events convey a lot of information.
*   **Entropy ($H$):** The average information content of a source. For a source producing symbols $x_i$, $H(X) = \sum P(x_i) \log_2(1/P(x_i))$ bits/symbol.
    *   Entropy is maximized when all symbols are equally likely.

## 2. Source Coding Theorem
*   **Shannon's First Theorem:** The output of a discrete memoryless source can be encoded such that the average length of the codeword per symbol is arbitrarily close to, but not less than, the entropy of the source ($H(X)$).
*   **Purpose:** Data compression. Removing redundancy.

## 3. Source Coding Algorithms
*   **Shannon-Fano Coding:** A top-down approach. Sorts symbols by probability, divides them into two sets of roughly equal probability, assigns 0 and 1, and repeats recursively.
*   **Huffman Coding:** A bottom-up approach. It is an optimal prefix code. It iteratively merges the two least probable symbols into a new node until a single root is formed.

## 4. Channel Capacity
*   **Discrete Memoryless Channel (DMC):** Characterized by transition probabilities $P(y_j|x_i)$ (probability of receiving $y_j$ given $x_i$ was transmitted).
*   **Mutual Information ($I(X;Y)$):** The amount of information the received signal $Y$ provides about the transmitted signal $X$.
*   **Channel Capacity ($C$):** The maximum mutual information over all possible input distributions. It is the maximum rate at which information can be reliably transmitted over the channel.

## 5. Shannon-Hartley Theorem
Defines the capacity of a continuous channel with Additive White Gaussian Noise (AWGN).
$$C = B \log_2(1 + S/N)$$
Where:
*   $C$ = Channel Capacity (bits/sec)
*   $B$ = Channel Bandwidth (Hz)
*   $S$ = Signal Power
*   $N$ = Noise Power
*   **Significance:** Shows the fundamental tradeoff between bandwidth and power.
