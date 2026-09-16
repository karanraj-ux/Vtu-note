# Module 3: Arrays, Matrices & String Manipulation in C

## VTU Syllabus Code: BPOPS103 / 203
**Course**: Principles of Programming Using C  
**Module Weightage**: 20 Marks in Semester End Examination

---

## 1. One-Dimensional Arrays (1D)

An array is a fixed-size, homogeneous, contiguous memory collection of elements of the same data type.

### Linear Search & Binary Search:
```c
// Binary Search Algorithm (Pre-condition: sorted array)
int binarySearch(int arr[], int n, int key) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == key) return mid;
        if (arr[mid] < key) low = mid + 1;
        else high = mid - 1;
    }
    return -1; // Element not found
}
```

---

## 2. Two-Dimensional Arrays (2D): Matrix Multiplication

To multiply matrix $A$ ($m \times n$) by matrix $B$ ($p \times q$), condition $n == p$ must hold. Result $C$ is $m \times q$:
$$C_{ij} = \sum_{k=0}^{n-1} A_{ik} \times B_{kj}$$

```c
#include <stdio.h>

void multiplyMatrices(int m, int n, int p, int q, int A[m][n], int B[p][q], int C[m][q]) {
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < q; j++) {
            C[i][j] = 0;
            for (int k = 0; k < n; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
}
```

---

## 3. String Processing in C

A string in C is a one-dimensional `char` array terminated by the null character `'\0'`.

### Standard String Functions (`<string.h>`):
1. `strlen(s)`: Returns length of string excluding `'\0'`.
2. `strcpy(dest, src)`: Copies source string into destination buffer.
3. `strcat(dest, src)`: Concatenates source onto end of destination.
4. `strcmp(s1, s2)`: Lexicographical comparison ($<0$, $0$, or $>0$).
