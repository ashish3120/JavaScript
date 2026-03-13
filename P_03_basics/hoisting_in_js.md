# JavaScript Hoisting – Complete Guide

> Hoisting is one of JavaScript's most misunderstood behaviors. It's not magic — it's a direct consequence of how the JavaScript engine processes code in two phases before executing a single line.

---

## Table of Contents

1. [What is Hoisting?](#1-what-is-hoisting)
2. [Why Does Hoisting Happen?](#2-why-does-hoisting-happen)
3. [Undefined vs. Not Defined](#3-undefined-vs-not-defined)
4. [Hoisting with Different Function Types](#4-hoisting-with-different-function-types)
5. [Call Stack Demo](#5-call-stack-demo)
6. [Key Takeaways](#6-key-takeaways)

---

## 1. What is Hoisting?

**Hoisting** is a phenomenon in JavaScript where you can access variables and functions **before they are initialized or defined** in the code — without getting an error.

```javascript
// Accessing before declaration
console.log(x);   // Output: undefined  (not an error)
greet();          // Output: "Hello!"   (works perfectly)

var x = 10;

function greet() {
    console.log("Hello!");
}
```

In most other languages, accessing a variable before its declaration would throw an error. In JavaScript, the engine prepares the memory in advance — making this possible.

> ⚠️ **Common Misconception:** Hoisting is often described as "JavaScript moves declarations to the top of the file." This is **not** what happens. The code does not move. Hoisting is purely a result of the **two-phase execution process**.

---

## 2. Why Does Hoisting Happen?

The root cause of hoisting lies in how JavaScript creates the **Execution Context** before running any code.

### The Memory Creation Phase (Phase 1)

Before a single line of code executes, the JavaScript engine skims through the **entire program** and allocates memory for all variables and functions:

| What is Found          | What Gets Stored in Memory                        |
|------------------------|---------------------------------------------------|
| `var` variable         | Key stored with value `undefined`                 |
| Function declaration   | Key stored with the **entire function code**      |

```javascript
var n = 5;
function square(num) { return num * num; }
```

**Memory after Phase 1 — before any code runs:**

```
┌───────────┬──────────────────────────────────┐
│    Key    │             Value                │
├───────────┼──────────────────────────────────┤
│     n     │          undefined               │
│   square  │  function square(num) {          │
│           │      return num * num;           │
│           │  }                               │
└───────────┴──────────────────────────────────┘
```

Because memory is allocated **before** execution begins, accessing `n` before its assignment returns `undefined` (not an error), and calling `square()` before its declaration works perfectly because the full function code is already in memory.

---

## 3. Undefined vs. Not Defined

These two terms sound similar but represent very different states in JavaScript:

| Term            | Meaning                                                                 | Error?              |
|-----------------|-------------------------------------------------------------------------|---------------------|
| **`undefined`** | Variable exists in memory (was declared), but no value has been assigned yet | ❌ No error        |
| **Not Defined** | Variable does not exist in memory at all — never declared in the script  | ✅ `ReferenceError` |

```javascript
console.log(x);   // undefined  → x was declared with var, allocated in Phase 1
console.log(y);   // ReferenceError: y is not defined → y was never declared
```

```javascript
var x = 10;
// y is never declared anywhere in the script
```

> `undefined` is a **value** in JavaScript. `not defined` is an **error state** — the variable simply does not exist in the memory space.

---

## 4. Hoisting with Different Function Types

Hoisting does **not** behave the same way for all function types. This is one of the most important distinctions to understand:

---

### Function Declarations — Fully Hoisted ✅

```javascript
greet();  // Output: "Hello!"  — works perfectly before declaration

function greet() {
    console.log("Hello!");
}
```

The entire function body is stored in memory during Phase 1, so it can be called from anywhere in the script.

---

### Arrow Functions & Function Expressions — NOT Fully Hoisted ❌

When a function is assigned to a variable using `var`, the **variable** is hoisted (as `undefined`), but **not the function itself**.

```javascript
// Arrow Function
getName();  // ❌ TypeError: getName is not a function

var getName = () => {
    console.log("Hello from arrow function");
};
```

```javascript
// Function Expression
getName();  // ❌ TypeError: getName is not a function

var getName = function() {
    console.log("Hello from function expression");
};
```

**Why?** Because `getName` is treated as a `var` variable during Phase 1. Its value in memory is `undefined` — not a function. Calling `undefined()` throws a `TypeError`.

---

### Hoisting Behaviour Comparison

| Function Type              | Syntax Example                        | Hoisted?     | Callable Before Declaration? |
|----------------------------|---------------------------------------|--------------|------------------------------|
| **Function Declaration**   | `function get() { ... }`             | ✅ Fully     | ✅ Yes                        |
| **Function Expression**    | `var get = function() { ... }`       | ⚠️ Partially | ❌ No — TypeError             |
| **Arrow Function**         | `var get = () => { ... }`            | ⚠️ Partially | ❌ No — TypeError             |

> **Partially hoisted** means the variable name is hoisted as `undefined`, but the function value is not assigned until that line is reached in Phase 2.

---

### Error Type Reference

| Scenario                                 | Error Type         | Reason                                       |
|------------------------------------------|--------------------|----------------------------------------------|
| Access undeclared variable               | `ReferenceError`   | Variable doesn't exist in memory at all      |
| Call arrow/expression function before init | `TypeError`      | Variable exists but its value is `undefined`, not a function |
| Call function declaration before definition | No error        | Full function code already in memory         |

---

## 5. Call Stack Demo

The browser's **Developer Tools → Sources → Call Stack panel** provides a live view of execution contexts as they are created and destroyed.

### What You See in the Call Stack

| Call Stack Entry | Meaning                                                         |
|------------------|-----------------------------------------------------------------|
| `anonymous`      | The **Global Execution Context (GEC)** — shown when the script starts running |
| `functionName`   | A **local Execution Context** pushed when a function is invoked |

---

### Live Execution Walkthrough

```javascript
var x = 10;

function greet() {
    console.log("Hello!");
}

greet();
```

**Step 1 — Script starts:**
```
Call Stack:
┌──────────────┐
│  anonymous   │  ← Global Execution Context
└──────────────┘
```

**Step 2 — `greet()` is called:**
```
Call Stack:
┌──────────────┐
│    greet     │  ← Pushed onto stack
├──────────────┤
│  anonymous   │
└──────────────┘
```

**Step 3 — `greet()` finishes:**
```
Call Stack:
┌──────────────┐
│  anonymous   │  ← greet() popped; back to global context
└──────────────┘
```

**Step 4 — Script finishes:**
```
                  ← Stack empty. Execution complete.
```

---

## 6. Key Takeaways

> **Hoisting is not about moving code to the top.**
> It is a result of the JavaScript engine's two-phase execution process — Memory Creation followed by Code Execution.

---

### Summary Table

| Concept                        | Behaviour                                                                  |
|--------------------------------|----------------------------------------------------------------------------|
| `var` variables                | Hoisted as `undefined` — accessible before assignment, no error            |
| Function declarations          | Fully hoisted — entire code in memory, callable anywhere in the script     |
| Arrow functions / expressions  | Variable hoisted as `undefined` — calling before init throws `TypeError`   |
| Undeclared variable access     | Throws `ReferenceError` — not in memory at all                             |
| `undefined`                    | A value — variable exists in memory but hasn't been assigned               |
| `not defined`                  | An error state — variable was never declared                               |

---

### Full Execution Flow

```
Script starts
    ↓
Global Execution Context created
    ↓
Phase 1 — Memory Creation
  var variables  →  stored as undefined
  function declarations  →  entire code stored
    ↓
Phase 2 — Code Execution (line by line)
  Variables assigned their actual values
  Functions invoked → new local EC pushed to Call Stack
  Function finishes → local EC popped from Call Stack
    ↓
Script finishes → GEC popped → Stack empty
```

---

## Technology Stack

| Component    | Detail                                              |
|--------------|-----------------------------------------------------|
| **Language** | JavaScript                                          |
| **Concept**  | Hoisting, Execution Context, Call Stack             |
| **Purpose**  | Understanding variable & function access before initialization |

---

*For further reading, refer to the [MDN Web Docs on Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting) and the [ECMAScript Specification](https://tc39.es/ecma262/).*
