# Module 1: Introduction to C Programming & Problem Solving

## VTU Syllabus Code: BPOP103 / 203
**Course**: Principles of Programming Using C  
**Module Weightage**: 20 Marks in Semester End Examination

---

## 1. Structure of a C Program & Compilation Flow
C is a procedural, statically typed, compiled programming language developed by Dennis Ritchie at Bell Labs in 1972.

### Standard Structure of a C Source Code:
```c
/* Documentation Section: Author, Date, Purpose */

#include <stdio.h>   // Link / Preprocessor Section
#include <stdlib.h>

#define MAX_BUFFER 1024  // Definition Section

int globalCounter = 0;   // Global Variable Declaration

int calculateSum(int a, int b); // Function Prototype / Declaration

int main(void) {         // Main Function: Program Entry Point
    // Local Declarations
    int num1 = 15;
    int num2 = 25;
    int total;

    // Executable Statements
    total = calculateSum(num1, num2);
    printf("Result: %d\n", total);

    return 0; // Status code 0 indicates successful execution
}

// User-defined Function Definition
int calculateSum(int a, int b) {
    return a + b;
}
```

### Four Stages of C Compilation:
1. **Preprocessing (`cpp`)**: Expands `#include`, `#define`, strips comments $\to$ generates `.i` file.
2. **Compilation (`cc`)**: Translates preprocessed source code into assembly instructions $\to$ generates `.s` file.
3. **Assembly (`as`)**: Converts assembly code into machine object code $\to$ generates `.o` or `.obj` binary file.
4. **Linking (`ld`)**: Resolves external library calls (`printf`, `sqrt`) and links object files into an executable binary (`a.out` or `.exe`).

---

## 2. Fundamental Data Types & Format Specifiers
| Type | Keyword | Size (32/64-bit GCC) | Format Specifier | Range |
| :--- | :--- | :--- | :--- | :--- |
| **Character** | `char` | 1 byte (8 bits) | `%c` | $-128$ to $+127$ (ASCII) |
| **Signed Integer** | `int` | 4 bytes (32 bits) | `%d` or `%i` | $-2^{31}$ to $2^{31}-1$ |
| **Unsigned Integer** | `unsigned int` | 4 bytes | `%u` | $0$ to $2^{32}-1$ |
| **Short Integer** | `short` | 2 bytes (16 bits) | `%hd` | $-32,768$ to $+32,767$ |
| **Long Integer** | `long` | 8 bytes (64-bit Linux) | `%ld` | $-2^{63}$ to $2^{63}-1$ |
| **Single Precision Float** | `float` | 4 bytes (IEEE 754) | `%f` | $1.2 \times 10^{-38}$ to $3.4 \times 10^{38}$ (6 decimals) |
| **Double Precision Float** | `double` | 8 bytes (IEEE 754) | `%lf` | $2.3 \times 10^{-308}$ to $1.7 \times 10^{308}$ (15 decimals) |

---

## 3. Operators & Expression Evaluation
C evaluates operators according to operator precedence and associativity:

### Operator Hierarchy (Highest to Lowest):
1. **Postfix**: `()`, `[]`, `->`, `.`, `++`, `--` (Left-to-Right)
2. **Unary**: `+`, `-`, `!`, `~`, `++`, `--`, `(type)`, `*`, `&`, `sizeof` (Right-to-Left)
3. **Multiplicative**: `*`, `/`, `%` (Left-to-Right)
4. **Additive**: `+`, `-` (Left-to-Right)
5. **Bitwise Shifts**: `<<`, `>>` (Left-to-Right)
6. **Relational**: `<`, `<=`, `>`, `>=` (Left-to-Right)
7. **Equality**: `==`, `!=` (Left-to-Right)
8. **Bitwise AND**: `&`
9. **Bitwise XOR**: `^`
10. **Bitwise OR**: `|`
11. **Logical AND**: `&&` (Short-circuit evaluation: if LHS is false, RHS is not evaluated)
12. **Logical OR**: `||` (Short-circuit: if LHS is true, RHS is not evaluated)
13. **Ternary Conditional**: `? :` (Right-to-Left)
14. **Assignment**: `=`, `+=`, `-=`, `*=`, `/=`, `%=`, etc. (Right-to-Left)
15. **Comma**: `,` (Left-to-Right, returns rightmost value)

---

## 4. VTU Exam Solved Problem: Roots of a Quadratic Equation
Write a complete, robust C program to compute real and complex roots of $ax^2 + bx + c = 0$:

```c
#include <stdio.h>
#include <math.h>

int main(void) {
    float a, b, c, discriminant, root1, root2, realPart, imagPart;

    printf("Enter coefficients a, b and c: ");
    if (scanf("%f %f %f", &a, &b, &c) != 3) {
        printf("Invalid input.\n");
        return 1;
    }

    // Check if linear equation
    if (a == 0) {
        if (b == 0) {
            printf("Invalid equation (no solution).\n");
        } else {
            printf("Linear equation root: x = %.4f\n", -c / b);
        }
        return 0;
    }

    discriminant = (b * b) - (4 * a * c);

    if (discriminant > 0) {
        // Two distinct real roots
        root1 = (-b + sqrt(discriminant)) / (2 * a);
        root2 = (-b - sqrt(discriminant)) / (2 * a);
        printf("Roots are real and distinct:\n");
        printf("Root 1 = %.4f\nRoot 2 = %.4f\n", root1, root2);
    } else if (discriminant == 0) {
        // Two equal real roots
        root1 = -b / (2 * a);
        printf("Roots are real and equal:\n");
        printf("Root 1 = Root 2 = %.4f\n", root1);
    } else {
        // Complex conjugate roots
        realPart = -b / (2 * a);
        imagPart = sqrt(-discriminant) / (2 * a);
        printf("Roots are complex conjugates:\n");
        printf("Root 1 = %.4f + %.4fi\n", realPart, imagPart);
        printf("Root 2 = %.4f - %.4fi\n", realPart, imagPart);
    }

    return 0;
}
```
