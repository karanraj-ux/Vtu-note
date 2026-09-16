# Module 4: Modular Programming: Functions, Recursion & Storage Classes

## VTU Syllabus Code: BPOPS103 / 203
**Course**: Principles of Programming Using C  
**Module Weightage**: 20 Marks in Semester End Examination

---

## 1. User-Defined Functions

Functions provide modularity, code reuse, and clean separation of logical concerns.

### Parameter Passing Mechanisms:
1. **Pass by Value**: A copy of the actual argument value is passed to the function formal parameter. Changes inside the function do **not** alter the original argument.
2. **Pass by Reference (Pointers)**: Memory address of argument is passed (`&var`). Dereferencing (`*ptr`) allows direct mutation of the original caller variable.

```c
// Swap two variables via Pass by Reference
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}
```

---

## 2. Recursion in C

A recursive function is one that calls itself directly or indirectly to solve smaller instances of the identical problem until a **base case** is reached.

### Classic Examples:
1. **Factorial**:
   ```c
   long long factorial(int n) {
       if (n <= 1) return 1; // Base case
       return n * factorial(n - 1);
   }
   ```

2. **Tower of Hanoi Problem**:
   ```c
   void towerOfHanoi(int n, char from_rod, char to_rod, char aux_rod) {
       if (n == 1) {
           printf("Move disk 1 from rod %c to rod %c\n", from_rod, to_rod);
           return;
       }
       towerOfHanoi(n - 1, from_rod, aux_rod, to_rod);
       printf("Move disk %d from rod %c to rod %c\n", n, from_rod, to_rod);
       towerOfHanoi(n - 1, aux_rod, to_rod, from_rod);
   }
   ```

---

## 3. Storage Classes in C

| Storage Class | Storage Location | Default Value | Scope | Lifetime |
| :--- | :--- | :--- | :--- | :--- |
| **`auto`** | RAM (Stack) | Garbage | Local block | Block execution |
| **`register`** | CPU Register | Garbage | Local block | Block execution |
| **`static`** | RAM (Data Segment) | `0` | File or local block | Entire program runtime |
| **`extern`** | RAM (Data Segment) | `0` | Global (multi-file) | Entire program runtime |
