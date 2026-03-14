# JavaScript `let` & `const` – Hoisting & Temporal Dead Zone (TDZ)

> A focused deep dive into how `let` and `const` are hoisted differently from `var`, what the Temporal Dead Zone really means, and the specific errors each violation produces.

---

## Table of Contents

1. [Are `let` and `const` Hoisted?](#1-are-let-and-const-hoisted)
2. [The Temporal Dead Zone (TDZ)](#2-the-temporal-dead-zone-tdz)
3. [Key Differences & Errors](#3-key-differences--errors)
4. [Summary of Error Types](#4-summary-of-error-types)
5. [Best Practices](#5-best-practices)
6. [Quick Reference](#6-quick-reference)

---

## 1. Are `let` and `const` Hoisted?

**Yes — `let` and `const` are hoisted.** Memory is allocated for them before any code executes, just like `var`. However, the way they are stored and what they are initialized to is fundamentally different.

---

### How Each Keyword is Hoisted

| Keyword  | Memory Allocated? | Stored In              | Initialized To    | Accessible Before Declaration? |
|----------|-------------------|------------------------|-------------------|-------------------------------|
| `var`    | ✅ Yes            | `window` (Global Object) | `undefined`     | ✅ Yes — returns `undefined`  |
| `let`    | ✅ Yes            | Separate "Script" space | Nothing (TDZ)   | ❌ No — `ReferenceError`      |
| `const`  | ✅ Yes            | Separate "Script" space | Nothing (TDZ)   | ❌ No — `ReferenceError`      |

```javascript
console.log(a);  // undefined  — var initialized on hoist
console.log(b);  // ❌ ReferenceError: Cannot access 'b' before initialization
console.log(c);  // ❌ ReferenceError: Cannot access 'c' before initialization

var a = 1;
let b = 2;
const c = 3;
```

---

### Memory Storage — The Key Difference

```
Global Memory (window):          Script Memory (separate space):
┌──────────┬───────────┐         ┌──────────┬───────────┐
│    a     │ undefined │         │    b     │  <TDZ>    │
└──────────┴───────────┘         │    c     │  <TDZ>    │
                                 └──────────┴───────────┘
```

> `let` and `const` are intentionally kept off the `window` object to prevent **global scope pollution** — one of the most common sources of hard-to-find bugs when using `var`.

---

### Viewing in Browser DevTools

In **Sources tab → Scope panel**, the separation is visible directly:

```
Scope:
├── Local
├── Script    ← let and const live here
└── Global    ← var lives here (on window)
```

---

## 2. The Temporal Dead Zone (TDZ)

The **Temporal Dead Zone** is the time window between when a variable is **hoisted** (memory allocated) and when it is **initialized** (its declaration line is executed).

---

### TDZ Visualized

```
Script begins executing
        │
        ▼
Memory allocated for let a   ← Hoisting happens here
        │
        │   ┌─────────────────────────────┐
        │   │      TEMPORAL DEAD ZONE     │
        │   │   a exists but is blocked   │
        │   │   Any access → ReferenceError│
        │   └─────────────────────────────┘
        │
        ▼
let a = 10;   ← Initialization — a LEAVES the TDZ ✅
        │
        ▼
console.log(a);  // 10 — safely accessible
```

---

### TDZ Error Message

```
ReferenceError: Cannot access 'a' before initialization
```

The phrasing **"before initialization"** (not "not defined") is significant — it tells you the variable *does* exist in memory, it just hasn't been initialized yet. This is the hallmark of a TDZ violation.

---

### TDZ Code Example

```javascript
// Accessing b while it's in the TDZ
console.log(b);   // ❌ ReferenceError: Cannot access 'b' before initialization

let b = 5;        // b leaves the TDZ here

console.log(b);   // ✅ 5
```

---

### When Does the TDZ End?

The TDZ ends the moment JavaScript execution **reaches the line** where the variable is declared and initialized:

```javascript
let x;          // TDZ ends here — x is initialized to undefined
const y = 10;   // TDZ ends here — y is initialized to 10
```

---

## 3. Key Differences & Errors

### Re-declaration

```javascript
// var — re-declaration silently allowed
var a = 1;
var a = 2;   // ✅ No error

// let — re-declaration throws SyntaxError
let b = 1;
let b = 2;   // ❌ SyntaxError: Identifier 'b' has already been declared

// const — re-declaration throws SyntaxError
const c = 1;
const c = 2; // ❌ SyntaxError: Identifier 'c' has already been declared
```

---

### `const` — Two Strict Rules

**Rule 1: Must be initialized at declaration**

```javascript
const b;         // ❌ SyntaxError: Missing initializer in const declaration
const b = 10;    // ✅ Correct — always initialize with const
```

**Rule 2: Cannot be re-assigned**

```javascript
const b = 10;
b = 20;          // ❌ TypeError: Assignment to constant variable
```

---

### Re-assignment Behaviour

```javascript
var a = 1;   a = 2;   // ✅ Allowed
let b = 1;   b = 2;   // ✅ Allowed
const c = 1; c = 2;   // ❌ TypeError
```

---

### Full Comparison Table

| Feature                       | `var`           | `let`          | `const`               |
|-------------------------------|-----------------|----------------|-----------------------|
| Hoisted                       | ✅ Yes          | ✅ Yes         | ✅ Yes                |
| Initialized on hoist          | ✅ `undefined`  | ❌ TDZ         | ❌ TDZ                |
| Stored on `window`            | ✅ Yes          | ❌ No          | ❌ No                 |
| Block scoped                  | ❌ No           | ✅ Yes         | ✅ Yes                |
| Re-declaration (same scope)   | ✅ Allowed      | ❌ SyntaxError | ❌ SyntaxError        |
| Re-assignment                 | ✅ Allowed      | ✅ Allowed     | ❌ TypeError          |
| Must initialize at declaration| ❌ No           | ❌ No          | ✅ Required           |

---

## 4. Summary of Error Types

| Error Type       | Triggered By                                                          | Example                                    |
|------------------|-----------------------------------------------------------------------|--------------------------------------------|
| `ReferenceError` | Accessing a variable in the TDZ, or one that was never declared       | `console.log(b)` before `let b = 5`        |
| `SyntaxError`    | Re-declaring `let`/`const`, or declaring `const` without a value      | `let a = 1; let a = 2;` or `const c;`     |
| `TypeError`      | Re-assigning a `const` variable                                       | `const c = 1; c = 2;`                      |

> **SyntaxErrors** are detected before execution begins — the entire script will fail to run if a SyntaxError is present anywhere.

---

### Error Message Reference

```javascript
// TDZ violation
// ReferenceError: Cannot access 'b' before initialization

// Variable never declared
// ReferenceError: z is not defined

// Re-declaration of let/const
// SyntaxError: Identifier 'a' has already been declared

// const without initializer
// SyntaxError: Missing initializer in const declaration

// Re-assignment of const
// TypeError: Assignment to constant variable
```

---

## 5. Best Practices

### Choosing the Right Keyword

```
Will the value ever change?
        │
        ├── No  →  const   ✅  (use as default)
        │
        └── Yes →  let     ✅
                      │
                      └── var  ❌  (avoid entirely)
```

---

### Why Avoid `var`?

| Issue                          | Impact                                                        |
|--------------------------------|---------------------------------------------------------------|
| Attached to `window`           | Pollutes global scope — accidental overwrites are possible    |
| Initialized as `undefined`     | Silent bugs — no error when accessed before declaration line  |
| Re-declaration allowed         | Hard-to-catch bugs in large or collaborative codebases        |
| Function-scoped, not block-scoped | Leaks out of `if`, `for`, and `while` blocks unexpectedly  |

---

### Minimizing TDZ Risk

> Declare and initialize your variables **at the top of their scope** to shrink the TDZ to zero.

```javascript
// ❌ TDZ window is wide
function calculate() {
    doSomething();       // TDZ — result not yet initialized
    doSomethingElse();   // TDZ — result not yet initialized
    let result = 42;
}

// ✅ TDZ eliminated
function calculate() {
    let result = 42;     // Declared at top — TDZ ends immediately
    doSomething();       // result safely accessible
    doSomethingElse();   // result safely accessible
}
```

---

## 6. Quick Reference

### TDZ Timeline for All Three Keywords

```
Execution Timeline ──────────────────────────────────────────►

var a:    [initialized: undefined]───────────[a = 1]──────────
           ✅ accessible from start            ✅

let b:    [▓▓▓▓▓▓▓▓▓ TDZ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓][b = 2]──────────
           ❌ ReferenceError                   ✅

const c:  [▓▓▓▓▓▓▓▓▓ TDZ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓][c = 3]──────────
           ❌ ReferenceError                   ✅
```

---

### One-Line Rules

```
var   → hoisted as undefined, on window, re-declarable, function-scoped
let   → hoisted in TDZ, off window, no re-declare, block-scoped, re-assignable
const → hoisted in TDZ, off window, no re-declare, block-scoped, NOT re-assignable, must initialize
```

---

## Technology Stack

| Component    | Detail                                                              |
|--------------|---------------------------------------------------------------------|
| **Language** | JavaScript                                                          |
| **Concept**  | `let`, `const`, `var`, Temporal Dead Zone, Hoisting, Block Scope   |
| **Purpose**  | Safe, predictable variable declarations and avoiding TDZ pitfalls  |

---

*For further reading, refer to [MDN on `let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), [MDN on `const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const), and the [Temporal Dead Zone explained](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz).*
