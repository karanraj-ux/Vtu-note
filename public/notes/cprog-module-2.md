# Module 2: Branching and Looping Statements in C

## VTU Syllabus Code: BPOPS103 / 203
**Course**: Principles of Programming Using C  
**Module Weightage**: 20 Marks in Semester End Examination

---

## 1. Conditional Branching Constructs

### 1. `if` and `if-else` Statements
```c
if (condition) {
    // executes when condition is non-zero (true)
} else {
    // executes when condition evaluates to zero (false)
}
```

### 2. Nested `if-else` and `else-if` Ladder
```c
if (marks >= 90) grade = 'S';
else if (marks >= 80) grade = 'A';
else if (marks >= 70) grade = 'B';
else grade = 'F';
```

### 3. Multi-way Selection: `switch-case`
- Evaluates an integral expression (`int` or `char`).
- Must include `break;` statements to prevent fall-through.
```c
switch (operator) {
    case '+': result = a + b; break;
    case '-': result = a - b; break;
    case '*': result = a * b; break;
    case '/': 
        if (b != 0) result = a / b;
        else printf("Error: Division by zero\n");
        break;
    default:
        printf("Invalid operator\n");
}
```

---

## 2. Iterative Control Loops

| Loop Construct | Syntax & Evaluation | Use Case |
| :--- | :--- | :--- |
| **`while` loop** | Entry-controlled: evaluates condition *before* loop body executes. | When iteration count is unknown beforehand. |
| **`for` loop** | `for (init; condition; update)` — concise entry-controlled construct. | Definite iteration count or array traversals. |
| **`do-while` loop** | Exit-controlled: executes body *at least once* before checking condition. | Menu-driven programs, validation prompts. |

### Jump Statements:
- `break`: Immediately exits the innermost loop or `switch` block.
- `continue`: Skips remaining statements in the current iteration and jumps to the update/test condition.
- `goto label;`: Unconditional jump to `label:`. Deprecated in modern structured programming.
