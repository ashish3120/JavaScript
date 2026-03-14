# JavaScript – `undefined` vs `not defined` & Loosely Typed Language

> Two of the most misunderstood concepts in JavaScript — clarified. Understanding the difference between `undefined` and `not defined`, and why JavaScript's flexible type system is a feature, not a flaw.

---

## Table of Contents

1. [`undefined` vs `not defined`](#1-undefined-vs-not-defined)
2. [Loosely Typed (Weakly Typed) Language](#2-loosely-typed-weakly-typed-language)
3. [Best Practices](#3-best-practices)
4. [Key Takeaways](#4-key-takeaways)

---

## 1. `undefined` vs `not defined`

These two terms look similar and are often confused — but they represent completely different states in JavaScript's memory model.

---

### `undefined`

`undefined` is a **special keyword and an actual value** in JavaScript. It is not an error — it is a placeholder automatically assigned by the JavaScript engine.

**When does it appear?**

During the **Memory Creation Phase** of the Execution Context, JavaScript scans through the entire program and allocates memory for every declared variable — before a single line of code executes. At this point, each variable is assigned `undefined` as a temporary value.

```javascript
console.log(a);  // undefined — not an error
var a = 10;
console.log(a);  // 10
```

**What it means:** The variable has been **declared** and **memory has been allocated**, but no value has been assigned to it yet.

```
Memory after Phase 1:
┌──────────┬───────────┐
│   Key    │   Value   │
├──────────┼───────────┤
│    a     │ undefined │  ← Exists in memory, no value yet
└──────────┴───────────┘

After line: var a = 10;
┌──────────┬───────────┐
│   Key    │   Value   │
├──────────┼───────────┤
│    a     │    10     │  ← Value assigned
└──────────┴───────────┘
```

---

### `not defined`

`not defined` is an **error state** — specifically a `ReferenceError`. It occurs when you try to access a variable that was never declared anywhere in the script, meaning no memory was ever allocated for it.

```javascript
console.log(x);  // ReferenceError: x is not defined
// x was never declared anywhere
```

**What it means:** The variable is completely **unknown** to the JavaScript engine — it does not exist in memory at all.

---

### Side-by-Side Comparison

| Aspect               | `undefined`                                  | `not defined`                              |
|----------------------|----------------------------------------------|--------------------------------------------|
| **Memory allocated** | ✅ Yes                                       | ❌ No                                      |
| **Variable declared**| ✅ Yes (`var a;` or `var a = ...`)           | ❌ No — never declared                     |
| **Type**             | `typeof undefined === "undefined"`           | Throws `ReferenceError`                    |
| **Is it an error?**  | ❌ No — it is a valid value                  | ✅ Yes — `ReferenceError`                  |
| **Engine behaviour** | Placeholder assigned in Memory Creation Phase | No record of the variable exists           |
| **Example**          | `var a; console.log(a)` → `undefined`        | `console.log(x)` (x never declared) → error |

---

### Checking with `typeof`

```javascript
var a;
console.log(typeof a);   // "undefined"  — safe, no error

console.log(typeof x);   // "undefined"  — typeof is safe even for undeclared vars
console.log(x);          // ReferenceError — direct access throws
```

> `typeof` is the only operation in JavaScript that is **safe to use** on an undeclared variable without throwing a `ReferenceError`.

---

## 2. Loosely Typed (Weakly Typed) Language

JavaScript is a **loosely typed** (also called **weakly typed**) language. This means variables are **not bound to a specific data type** — a single variable can hold any type of value, and that type can change at any point during the program.

---

### Dynamic Type Assignment

```javascript
var data = "Hello";      // data is a String
console.log(typeof data); // "string"

data = 42;               // Now data is a Number
console.log(typeof data); // "number"

data = true;             // Now data is a Boolean
console.log(typeof data); // "boolean"

data = { name: "Alice" }; // Now data is an Object
console.log(typeof data); // "object"
```

The variable `data` changes type freely — JavaScript handles all memory and type management behind the scenes.

---

### JavaScript vs. Strictly Typed Languages

| Feature                        | JavaScript (Loosely Typed) | C++ / Java (Strictly Typed)         |
|--------------------------------|----------------------------|-------------------------------------|
| Type declaration required      | ❌ No                      | ✅ Yes (`int x`, `String name`)     |
| Type can change after assignment | ✅ Yes                   | ❌ No — type is fixed at declaration |
| Runtime type flexibility       | ✅ High                    | ❌ Restricted                       |
| Type management                | Handled by JS engine       | Handled by developer                |
| Example                        | `var x = 5; x = "hi";`    | `int x = 5; x = "hi"; // Error`    |

---

### Is "Loosely Typed" a Weakness?

While the term "weakly typed" might imply fragility, JavaScript is actually quite powerful in how it manages types:

- It handles **automatic type conversions** (type coercion) internally
- It manages **memory allocation** for different types transparently
- It provides **flexibility** that enables rapid prototyping and dynamic programming patterns

> The flexibility of JavaScript's type system is a deliberate design decision — not a limitation.

---

## 3. Best Practices

### ❌ Avoid Manually Assigning `undefined`

Although JavaScript allows you to manually assign `undefined` to a variable, this is considered **bad practice**:

```javascript
var a = undefined;  // ❌ Avoid this
```

**Why it's problematic:**

- `undefined` is meant to signal that the JavaScript **engine** has not yet assigned a value to a variable
- When you manually set `undefined`, you break that contract — now it's unclear whether the variable is uninitialized or was deliberately set to `undefined`
- It can lead to **confusion and hard-to-track bugs** in your codebase

---

### ✅ Use `null` to Intentionally Express "No Value"

If you want to explicitly represent the absence of a value, use `null` instead:

```javascript
var a = null;   // ✅ Clearly intentional — "this variable has no value right now"
var b;          // ✅ Let the engine assign undefined — signals "not yet initialized"
```

| Signal You Want to Send              | Use      |
|--------------------------------------|----------|
| "Not initialized yet" (engine)       | Leave as `undefined` (don't assign manually) |
| "Intentionally empty / no value"     | `null`   |
| "Has a value" (even falsy like `0`)  | Assign the actual value |

---

## 4. Key Takeaways

> **`undefined` means a variable is known but lacks a value.**
> **`not defined` means the variable is completely unknown to the program.**

---

### Summary Table

| Concept                         | Description                                                                  |
|---------------------------------|------------------------------------------------------------------------------|
| **`undefined`**                 | A real value — variable exists in memory but hasn't been assigned yet        |
| **`not defined`**               | An error state — variable was never declared, no memory allocated            |
| **Memory Creation Phase**       | The reason `undefined` exists — JS pre-allocates memory before execution     |
| **Loosely typed**               | Variables are not fixed to a type — type can change freely at runtime        |
| **Strictly typed (C++/Java)**   | Variable type is declared once and cannot change                             |
| **Manual `undefined` assignment**| Bad practice — reserve `undefined` for the engine, use `null` intentionally |
| **`typeof` on undeclared var**  | Returns `"undefined"` safely — the one operation that won't throw            |

---

### Quick Reference

```javascript
// undefined — variable declared, no value yet
var a;
console.log(a);           // undefined
console.log(typeof a);    // "undefined"

// not defined — variable never declared
console.log(b);           // ReferenceError: b is not defined
console.log(typeof b);    // "undefined" — typeof is safe, no error

// Loosely typed — type changes freely
var x = "text";           // string
x = 100;                  // number
x = false;                // boolean

// Best practice
var name = null;          // ✅ Intentional empty value
var age;                  // ✅ Let engine assign undefined
var city = undefined;     // ❌ Avoid — ambiguous intent
```

---

## Technology Stack

| Component    | Detail                                                         |
|--------------|----------------------------------------------------------------|
| **Language** | JavaScript                                                     |
| **Concept**  | `undefined`, `not defined`, Type System, Memory Model          |
| **Purpose**  | Clarifying foundational JS behavior and writing cleaner code   |

---

*For further reading, refer to [MDN Web Docs on `undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) and [MDN on Data Types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures).*
