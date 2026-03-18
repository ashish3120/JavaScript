# JavaScript Higher-Order Functions & Functional Programming

> Higher-Order Functions are at the heart of functional programming in JavaScript. They enable modular, reusable, and testable code by separating *what* to do from *how* to do it.

---

## Table of Contents

1. [What is a Higher-Order Function?](#1-what-is-a-higher-order-function)
2. [Functional vs. Non-Functional Code](#2-functional-vs-non-functional-code)
3. [Implementing a Custom `map` (Polyfill Logic)](#3-implementing-a-custom-map-polyfill-logic)
4. [Summary of Concepts](#4-summary-of-concepts)
5. [Key Takeaways](#5-key-takeaways)

---

## 1. What is a Higher-Order Function?

A **Higher-Order Function (HOF)** is a function that does at least one of the following:

| Capability                              | Example                                  |
|-----------------------------------------|------------------------------------------|
| **Takes another function as an argument** | `arr.map(fn)`, `arr.filter(fn)`        |
| **Returns a function**                  | `function multiplier(x) { return fn }` |

```javascript
// Takes a function as argument
function execute(fn) {
    fn();
}

execute(function() {
    console.log("I was passed as an argument!");
});

// Returns a function
function multiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = multiplier(2);
console.log(double(5));  // 10
```

> The function passed *into* a higher-order function is called a **callback function**.

---

## 2. Functional vs. Non-Functional Code

### The Problem — Calculating Circle Properties

Given a list of circle radii, calculate the **area**, **circumference**, and **diameter** for each.

```javascript
const radii = [3, 5, 2, 8];
```

---

### ❌ The Non-Functional Way (Bad Practice)

The naive approach creates a separate function for each property — each with nearly identical looping logic:

```javascript
function calculateArea(radii) {
    const output = [];
    for (let i = 0; i < radii.length; i++) {
        output.push(Math.PI * radii[i] * radii[i]);
    }
    return output;
}

function calculateCircumference(radii) {
    const output = [];
    for (let i = 0; i < radii.length; i++) {
        output.push(2 * Math.PI * radii[i]);
    }
    return output;
}

function calculateDiameter(radii) {
    const output = [];
    for (let i = 0; i < radii.length; i++) {
        output.push(2 * radii[i]);
    }
    return output;
}
```

**Problems with this approach:**

| Issue                  | Description                                                         |
|------------------------|---------------------------------------------------------------------|
| **Violates DRY**       | The loop logic is copy-pasted across every function                 |
| **Not modular**        | Each function mixes "how to loop" with "what to calculate"          |
| **Hard to extend**     | Adding a new property (e.g., radius squared) requires another full function |
| **Hard to test**       | Can't test the calculation logic independently from the looping logic |

---

### ✅ The Functional Way (Recommended)

**Step 1 — Extract pure logic functions:**

Each small function does only one thing — the specific calculation. No loops, no array management:

```javascript
const area          = (radius) => Math.PI * radius * radius;
const circumference = (radius) => 2 * Math.PI * radius;
const diameter      = (radius) => 2 * radius;
```

These are **pure functions** — given the same input, they always return the same output with no side effects.

---

**Step 2 — Create a generic Higher-Order Function:**

```javascript
function calculate(radii, logic) {
    const output = [];
    for (let i = 0; i < radii.length; i++) {
        output.push(logic(radii[i]));
    }
    return output;
}
```

`calculate` handles the **"how"** — looping through the array and collecting results.
The passed `logic` function handles the **"what"** — the specific calculation.

---

**Step 3 — Compose them:**

```javascript
const radii = [3, 5, 2, 8];

console.log(calculate(radii, area));           // Areas
console.log(calculate(radii, circumference));  // Circumferences
console.log(calculate(radii, diameter));       // Diameters
```

Adding a new property now requires **zero changes** to `calculate`:

```javascript
const radiusSquared = (radius) => radius * radius;
console.log(calculate(radii, radiusSquared));  // ✅ Works immediately
```

---

### Non-Functional vs. Functional — Comparison

| Aspect                  | Non-Functional                         | Functional                              |
|-------------------------|----------------------------------------|-----------------------------------------|
| Code duplication        | ❌ Loop repeated in every function     | ✅ Loop written once in `calculate`     |
| Separation of concerns  | ❌ Loop + logic mixed together         | ✅ Loop and logic fully separated       |
| Adding new properties   | ❌ Requires a new full function        | ✅ Just add a new pure logic function   |
| Testability             | ❌ Can't test logic independently      | ✅ Pure functions are trivially testable |
| Reusability             | ❌ Low — each function is one-purpose  | ✅ High — `calculate` works with anything |

---

### Responsibility Split

```
calculate(radii, area)
│                  │
│                  └─ area(radius) → WHAT to calculate
│                     (pure logic function — no side effects)
│
└─ calculate()    → HOW to process the array
   (higher-order function — orchestrates execution)
```

---

## 3. Implementing a Custom `map` (Polyfill Logic)

The `calculate` function written above is conceptually **identical** to JavaScript's built-in `Array.prototype.map()`.

### Built-in `map`

```javascript
const radii = [3, 5, 2, 8];

const areas = radii.map(area);  // area is the callback
console.log(areas);
```

`map` is a **Higher-Order Function** — it:
- Takes a callback function as an argument
- Applies it to each element
- Returns a new array with the results

---

### Writing a Custom `map` Polyfill

By adding a method to `Array.prototype`, you can replicate `map`'s behavior and use it with the same dot-notation syntax:

```javascript
Array.prototype.calculate = function(logic) {
    const output = [];
    for (let i = 0; i < this.length; i++) {
        output.push(logic(this[i]));
    }
    return output;
};
```

**Using the custom method:**

```javascript
const radii = [3, 5, 2, 8];

console.log(radii.calculate(area));           // Areas ✅
console.log(radii.calculate(circumference));  // Circumferences ✅
console.log(radii.calculate(diameter));       // Diameters ✅
```

This works exactly like the native `.map()`:

```javascript
console.log(radii.map(area));           // Same result
console.log(radii.calculate(area));     // Same result via polyfill
```

---

### `calculate` vs. `map` — Side by Side

```javascript
// Native map
const areas = radii.map(radius => Math.PI * radius * radius);

// Custom calculate (polyfill equivalent)
const areas = radii.calculate(radius => Math.PI * radius * radius);

// Both produce the same output
```

> Understanding `map` as a higher-order function that accepts a callback is the foundation for understanding `filter`, `reduce`, and all other functional array methods in JavaScript.

---

## 4. Summary of Concepts

| Term                        | Definition                                                                        | Example                             |
|-----------------------------|-----------------------------------------------------------------------------------|-------------------------------------|
| **Higher-Order Function**   | A function that takes another function as an argument or returns a function       | `calculate`, `map`, `filter`        |
| **Callback Function**       | The function passed into a higher-order function to provide specific logic        | `area`, `circumference`             |
| **Pure Function**           | A function that always returns the same output for the same input, with no side effects | `radius => 2 * radius`          |
| **Functional Programming**  | A paradigm that emphasizes modularity, pure functions, and function composition   | Separating loop logic from calculation |
| **DRY Principle**           | Don't Repeat Yourself — avoid duplicating logic by abstracting it into reusable units | Writing `calculate` once instead of per-property |
| **Polyfill**                | A custom implementation of a built-in function to replicate its behavior          | `Array.prototype.calculate`         |

---

## 5. Key Takeaways

> **In technical interviews, always aim to break down complex logic into smaller, functional units. This demonstrates deep knowledge of JavaScript and clean coding practices.**

---

### The Functional Programming Mindset

```
Instead of:
  "Write a function that loops and calculates X"
  "Write another function that loops and calculates Y"

Think:
  "Write small, pure functions for X, Y, Z"
  "Write one generic function that orchestrates them"
```

---

### Core Rules Summary

| Rule                                          | Explanation                                                        |
|-----------------------------------------------|--------------------------------------------------------------------|
| Separate "how" from "what"                    | HOF handles structure; callback handles logic                      |
| Write pure functions for logic                | No side effects — easy to test, compose, and reuse                 |
| Avoid duplicate loop logic                    | Extract to a single HOF — pass different callbacks as needed       |
| Prefer `map`, `filter`, `reduce`              | Built-in HOFs — use them over manual loops wherever possible       |
| Extend via `Array.prototype` (with caution)   | Only for learning / polyfills — avoid modifying prototypes in production |

---

### Quick Reference

```javascript
// Pure logic functions
const area          = r => Math.PI * r * r;
const circumference = r => 2 * Math.PI * r;
const diameter      = r => 2 * r;

// Higher-order function
const calculate = (arr, logic) => arr.map(logic);

// Composition
const radii = [3, 5, 2, 8];

calculate(radii, area);           // [28.27, 78.54, 12.57, 201.06]
calculate(radii, circumference);  // [18.85, 31.42, 12.57, 50.27]
calculate(radii, diameter);       // [6, 10, 4, 16]
```

---

## Technology Stack

| Component    | Detail                                                                |
|--------------|-----------------------------------------------------------------------|
| **Language** | JavaScript                                                            |
| **Concept**  | Higher-Order Functions, Functional Programming, Pure Functions, `map` |
| **Purpose**  | Writing modular, reusable, DRY, and testable JavaScript code          |

---

*For further reading, refer to [MDN Web Docs on Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) and [Functional Programming in JavaScript](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function).*
