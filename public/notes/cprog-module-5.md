# Module 5: Pointers, Structures, Unions & Dynamic Memory Allocation

## VTU Syllabus Code: BPOPS103 / 203
**Course**: Principles of Programming Using C  
**Module Weightage**: 20 Marks in Semester End Examination

---

## 1. Pointers & Pointer Arithmetic

A pointer is a variable that stores the memory address of another variable.

- Address-of operator (`&`): Retrieves physical memory location.
- Indirection/Dereference operator (`*`): Accesses value stored at the referenced address.
- Pointer Arithmetic: Incrementing `ptr++` advances the address by `sizeof(type)` bytes.

---

## 2. Structures vs Unions

### Structures (`struct`):
Heterogeneous collection of elements where **each member is allocated its own distinct memory space**. Total size is $\ge$ sum of all member sizes (subject to memory alignment padding).

```c
struct Student {
    char usn[11];   // 11 bytes
    char name[50];  // 50 bytes
    float gpa;      // 4 bytes
};
```

### Unions (`union`):
Members **share the same overlapping memory space**. Total memory size equals only the size of the largest member. Writing to one member overwrites other members.

```c
union Data {
    int i;          // 4 bytes
    float f;        // 4 bytes
    char str[20];   // 20 bytes -> Total Union size = 20 bytes
};
```

---

## 3. Dynamic Memory Allocation (`<stdlib.h>`)

Allocates memory from the **Heap** at runtime:

1. `malloc(size_t size)`: Allocates uninitialized memory block of `size` bytes containing garbage values.
   ```c
   int *arr = (int *)malloc(n * sizeof(int));
   ```
2. `calloc(size_t num, size_t size)`: Allocates memory and initializes every byte to zero (`0`).
3. `realloc(void *ptr, size_t new_size)`: Resizes previously allocated heap block.
4. `free(void *ptr)`: Deallocates heap memory back to the operating system to prevent memory leaks.
