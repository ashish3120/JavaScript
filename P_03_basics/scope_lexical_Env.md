# JavaScript Scope, Lexical Environment & Scope Chain

> Scope, Lexical Environment, and the Scope Chain are the mechanisms that determine where variables can be accessed in JavaScript. Understanding these concepts is fundamental to mastering how the language finds — and fails to find — variables at runtime.

---

## Table of Contents

1. [What is Scope?](#1-what-is-scope)
2. [Lexical Environment](#2-lexical-environment)
3. [The Scope Chain](#3-the-scope-chain)
4. [Visualizing in the Browser](#4-visualizing-in-the-browser)
5. [Key Takeaways](#5-key-takeaways)

---

## 1. What is Scope?

**Scope** defines where a specific variable or function can be accessed in your code.

It answers two fundamental questions:

- *"Where can I access this variable?"*
- *"Is this variable inside the scope of this function?"*

```javascript
function outer() {
    var x = 10;

    function inner() {
        console.log(x);  // ✅ Accessible — x is in the parent scope
    }

    inner();
}

console.log(x);  // ❌ ReferenceError — x is not accessible here
```

### The Golden Rule of Scope

> A **child function** can access variables defined in its **parent's scope**.
> A **parent function** cannot access variables defined inside its **child functions**.

```
Parent  →  Cannot see inside child  ❌
Child   →  Can see into parent       ✅
```

---

## 2. Lexical Environment

The **Lexical Environment** is the engine that powers scope. It is created automatically every time an **Execution Context** is created.

### Definition

```
Lexical Environment = Local Memory  +  Reference to Parent's Lexical Environment
```

Every execution context carries two things:
- Its own **local memory** (variables and functions declared inside it)
- A **reference pointer** to its parent's Lexical Environment

---

### What Does "Lexical" Mean?

The term **lexical** refers to **position in the source code** — specifically, where a function physically sits inside the code hierarchy.

| Relationship          | Meaning                                                              |
|-----------------------|----------------------------------------------------------------------|
| **Lexical Parent**    | The scope in which a function is physically written                  |
| **Lexical Child**     | A function written inside another function                           |
| **Lexical Hierarchy** | The nesting order of functions as they appear in the source code     |

```javascript
function A() {              // A's lexical parent → Global
    function C() {          // C's lexical parent → A
        // C is lexically inside A
    }
}
```

---

### Lexical Environment Chain

Each Lexical Environment links to the one above it, forming a chain:

```
C's Lexical Environment
    │  local memory of C
    └─ reference to → A's Lexical Environment
                          │  local memory of A
                          └─ reference to → Global Lexical Environment
                                                │  global memory
                                                └─ reference to → null
```

---

### Lexical Environment Created Per Context

```javascript
var globalVar = "I am global";

function A() {
    var aVar = "I am in A";

    function C() {
        var cVar = "I am in C";
        console.log(cVar);      // Found in C's local memory
        console.log(aVar);      // Found in A's Lexical Environment
        console.log(globalVar); // Found in Global Lexical Environment
    }

    C();
}

A();
```

| Variable      | Found In                          |
|---------------|-----------------------------------|
| `cVar`        | C's local memory                  |
| `aVar`        | A's Lexical Environment           |
| `globalVar`   | Global Lexical Environment        |

---

## 3. The Scope Chain

The **Scope Chain** is the step-by-step process the JavaScript engine follows to locate a variable.

### How the Scope Chain Works

```
Engine encounters a variable inside a function
        ↓
Step 1: Look in LOCAL memory of the current function
        ↓
Found? → Use it ✅
Not found? ↓
Step 2: Follow the reference to the PARENT's Lexical Environment
        ↓
Found? → Use it ✅
Not found? ↓
Step 3: Follow reference to the GRANDPARENT's Lexical Environment
        ↓
        ... continues climbing the chain ...
        ↓
Reached the GLOBAL Lexical Environment?
        ↓
Found? → Use it ✅
Not found? ↓
Parent reference is NULL
        ↓
❌ ReferenceError: variable is not defined
```

---

### Scope Chain Example

```javascript
var b = 20;             // Global scope

function A() {
    var a = 10;         // A's local scope

    function C() {
        // var b is NOT declared here
        console.log(b); // Engine searches up the chain for b
    }

    C();
}

A();
```

**Engine's lookup process for `b` inside `C`:**

```
1. Look in C's local memory   →  b not found
2. Look in A's local memory   →  b not found
3. Look in Global memory      →  b = 20 ✅  Found!

Output: 20
```

---

### When the Chain Reaches `null`

```javascript
function A() {
    function C() {
        console.log(z);  // z is nowhere in the chain
    }
    C();
}
A();
// ReferenceError: z is not defined
```

**Lookup process:**

```
1. C's local memory   →  z not found
2. A's local memory   →  z not found
3. Global memory      →  z not found
4. Parent of Global   →  null
   ↓
❌ ReferenceError: z is not defined
```

---

### Scope Chain Direction — One Way Only

| Direction              | Can Access? | Reason                                    |
|------------------------|-------------|-------------------------------------------|
| Child → Parent         | ✅ Yes      | Child's Lexical Environment references parent |
| Child → Grandparent    | ✅ Yes      | Chain continues upward                    |
| Parent → Child         | ❌ No       | No downward reference exists in the chain |
| Sibling → Sibling      | ❌ No       | No shared reference between sibling scopes |

---

## 4. Visualizing in the Browser

The browser's **Developer Tools → Sources tab → Scope panel** shows the Lexical Environment hierarchy in real time when paused at a breakpoint.

### Scope Panel Breakdown

| Scope Panel Entry    | What It Displays                                              |
|----------------------|---------------------------------------------------------------|
| **Local**            | Variables in the currently executing function's memory        |
| **Closure / Script** | Variables from parent functions or the enclosing script scope |
| **Global**           | Variables attached to the `window` object (global memory)     |

---

### What to Look For

When paused inside a nested function (e.g., `C` inside `A`):

```
Scope:
├── Local          → cVar: "I am in C"
├── Closure (A)    → aVar: "I am in A"
└── Global         → globalVar: "I am global", window: {...}
```

This visual directly mirrors the Scope Chain — each layer represents one step up the lexical hierarchy.

> Using breakpoints to inspect the Scope panel is one of the most effective ways to build an intuitive understanding of how the Scope Chain operates.

---

## 5. Key Takeaways

> **You can access variables defined in a parent scope from a child function, but a parent function cannot access variables defined inside its child functions.**

---

### Core Concepts Summary

| Concept               | Definition                                                                       |
|-----------------------|----------------------------------------------------------------------------------|
| **Scope**             | Where a variable or function is accessible in the code                           |
| **Lexical Environment** | Local memory + reference to parent's Lexical Environment — created per Execution Context |
| **Lexical Parent**    | The scope where a function is physically written in the source code              |
| **Scope Chain**       | The chain of Lexical Environment references the engine traverses to find a variable |
| **Chain direction**   | Always upward — child to parent, never parent to child                           |
| **End of chain**      | The global environment's parent is `null` — if variable not found here, `ReferenceError` |

---

### Complete Scope Chain Visualization

```javascript
var global = "global";

function A() {                     // Lexical parent: Global
    var inA = "in A";

    function C() {                 // Lexical parent: A
        var inC = "in C";

        // Scope Chain for variable lookup inside C:
        // inC       → found in C's local memory       ✅
        // inA       → found in A's Lexical Environment ✅
        // global    → found in Global L.E.             ✅
        // unknown   → not found anywhere → null → ❌  ReferenceError
    }
}
```

```
Lexical Hierarchy:
  Global  ←──  A  ←──  C
   (null)         ↑        ↑
                 parent   parent
```

---

### Quick Rule Reference

```
✅ Child accesses parent variable   → Works
✅ Child accesses grandparent var   → Works (chain climbs)
❌ Parent accesses child variable   → ReferenceError
❌ Sibling accesses sibling var     → ReferenceError
❌ Variable not found at null ref   → ReferenceError
```

---

## Technology Stack

| Component    | Detail                                                           |
|--------------|------------------------------------------------------------------|
| **Language** | JavaScript                                                       |
| **Concept**  | Scope, Lexical Environment, Scope Chain, Execution Context       |
| **Purpose**  | Understanding variable accessibility and lookup in JavaScript    |

---

*For further reading, refer to the [MDN Web Docs on Scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope) and [Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures).*
