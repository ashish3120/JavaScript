# JavaScript Execution Context & Call Stack – Behind the Scenes Guide

> Everything in JavaScript happens inside an Execution Context. Understanding how contexts are created, managed, and destroyed is the foundation for understanding how JavaScript truly works under the hood.

---

## Table of Contents

1. [The Execution Context](#1-the-execution-context)
2. [Two Phases of Execution](#2-two-phases-of-execution)
3. [Function Execution in Detail](#3-function-execution-in-detail)
4. [The Call Stack](#4-the-call-stack)
5. [Call Stack Synonyms](#5-call-stack-synonyms)
6. [Complete Visual Summary](#6-complete-visual-summary)

---

## 1. The Execution Context

**Everything in JavaScript happens inside an Execution Context.**

Think of it as a large box that wraps all JavaScript code and gives it the environment it needs to run. Every execution context has exactly two components:

| Component                        | Also Known As          | Purpose                                                    |
|----------------------------------|------------------------|------------------------------------------------------------|
| **Memory Component**             | Variable Environment   | Stores all variables and functions as key-value pairs      |
| **Code Component**               | Thread of Execution    | Executes code one line at a time, in order                 |

```
┌──────────────────────────────────────────────┐
│              EXECUTION CONTEXT               │
│                                              │
│  ┌─────────────────┐  ┌────────────────────┐ │
│  │    MEMORY       │  │       CODE         │ │
│  │   COMPONENT     │  │    COMPONENT       │ │
│  │                 │  │                    │ │
│  │  key : value    │  │  Execute line      │ │
│  │  n   : 2        │  │  by line...        │ │
│  │  fn  : { ... }  │  │                    │ │
│  └─────────────────┘  └────────────────────┘ │
└──────────────────────────────────────────────┘
```

> JavaScript is a **single-threaded, synchronous** language — the Code Component executes only one line at a time, in strict sequence.

---

## 2. Two Phases of Execution

When you run a JavaScript program, the JavaScript engine creates a **Global Execution Context (GEC)** and processes it in two distinct phases:

---

### Phase 1 — Memory Creation Phase

JavaScript skims through the **entire program** before executing a single line, allocating memory to every variable and function it finds:

| What is found | What gets stored in memory          |
|---------------|--------------------------------------|
| **Variable**  | The key is stored with value `undefined` |
| **Function**  | The key is stored with the **entire function code** verbatim |

```javascript
var n = 2;

function square(num) {
    var ans = num * num;
    return ans;
}

var result = square(n);
```

**After Phase 1 — Memory looks like:**

```
Memory Component:
┌───────────┬──────────────────────┐
│    Key    │        Value         │
├───────────┼──────────────────────┤
│     n     │      undefined       │
│   square  │  function square()   │
│           │  { var ans = num*num │
│           │    return ans; }     │
│   result  │      undefined       │
└───────────┴──────────────────────┘
```

> Variables are **not yet assigned their real values** at this stage — they hold `undefined` as a placeholder. This behaviour is the root cause of **JavaScript Hoisting**.

---

### Phase 2 — Code Execution Phase

JavaScript now runs through the program **line by line**, updating memory and executing logic:

```
Line 1: var n = 2;
        → Memory updated: n = 2  (replaces undefined)

Line 3-6: function declaration
        → Already stored in Phase 1, skipped

Line 8: var result = square(n);
        → Function is invoked → New Execution Context is created
```

**After Phase 2 starts — Memory updated:**

```
Memory Component:
┌───────────┬──────────────────────┐
│    Key    │        Value         │
├───────────┼──────────────────────┤
│     n     │          2           │  ← Updated from undefined
│   square  │  function square()…  │
│   result  │      undefined       │  ← Waiting for function to return
└───────────┴──────────────────────┘
```

---

## 3. Function Execution in Detail

When a function is invoked, JavaScript creates a **brand new, local Execution Context** specifically for that function call.

---

### Step-by-Step Function Lifecycle

```javascript
function square(num) {
    var ans = num * num;
    return ans;
}

var result = square(2);
```

**Step 1 — New local execution context is created:**

```
┌───────────────────────────────────────┐
│     LOCAL EXECUTION CONTEXT: square   │
│                                       │
│  Memory          │  Code              │
│  ──────────────  │  ────────────────  │
│  num : undefined │                    │
│  ans : undefined │                    │
└───────────────────────────────────────┘
```

**Step 2 — Memory Creation Phase (inside the function):**

Parameters and local variables are allocated:

```
Memory:
  num → undefined
  ans → undefined
```

**Step 3 — Code Execution Phase (inside the function):**

```
num is assigned the argument value:  num = 2
ans = num * num = 2 * 2 = 4
```

**Step 4 — `return` is encountered:**

```javascript
return ans;  // Returns 4 to the calling context
```

- The **return value** (`4`) is sent back to the Global Execution Context
- `result` in the global memory is updated from `undefined` to `4`
- The **local execution context is deleted** — it no longer exists

---

### Function Execution Summary

| Step | What Happens                                                         |
|------|----------------------------------------------------------------------|
| 1    | Function is invoked — a new local Execution Context is created       |
| 2    | **Memory Phase:** Parameters and local variables stored as `undefined` |
| 3    | **Execution Phase:** Parameters assigned argument values, code runs  |
| 4    | `return` sends the value back to the calling context                 |
| 5    | Local Execution Context is **destroyed**                             |

---

## 4. The Call Stack

With multiple execution contexts being created and destroyed, JavaScript needs a mechanism to track and manage them all. That mechanism is the **Call Stack**.

### How the Call Stack Works

| Event                              | Stack Action                              |
|------------------------------------|-------------------------------------------|
| Program starts                     | Global Execution Context (GEC) is **pushed** onto the stack |
| A function is invoked              | Its local execution context is **pushed** on top            |
| A function finishes (`return`)     | Its execution context is **popped** off the stack           |
| Entire script finishes             | GEC is **popped** off — stack is now **empty**              |

---

### Call Stack Walkthrough

```javascript
var n = 2;
function square(num) { return num * num; }
var result = square(n);
```

**State 1 — Program starts:**
```
Call Stack:
┌───────────────────────┐
│  Global Execution     │  ← GEC pushed
│  Context (GEC)        │
└───────────────────────┘
```

**State 2 — `square(n)` is called:**
```
Call Stack:
┌───────────────────────┐
│  square()             │  ← Pushed on top
├───────────────────────┤
│  Global Execution     │
│  Context (GEC)        │
└───────────────────────┘
```

**State 3 — `square()` returns:**
```
Call Stack:
┌───────────────────────┐
│  Global Execution     │  ← square() popped, back to GEC
│  Context (GEC)        │
└───────────────────────┘
```

**State 4 — Script finishes:**
```
Call Stack:
                           ← Empty. GEC popped. Program complete.
```

> The Call Stack always follows **LIFO** — **Last In, First Out**. The most recently created execution context is always the first to be removed.

---

## 5. Call Stack Synonyms

The Call Stack is a well-known concept in computer science and is referred to by several names across different documentation and textbooks:

| Synonym                    | Context Where Used                     |
|----------------------------|----------------------------------------|
| **Call Stack**             | Most common — used in browser DevTools |
| **Execution Context Stack**| Academic / specification language      |
| **Program Stack**          | General computer science terminology   |
| **Control Stack**          | Compiler and interpreter documentation |
| **Runtime Stack**          | Runtime environment documentation      |

> Regardless of the name, they all refer to the **same data structure** managing execution contexts in JavaScript.

---

## 6. Complete Visual Summary

### The Big Picture

```
JavaScript Program Starts
        ↓
Global Execution Context (GEC) Created
        ↓
┌─────────────────────────────────────────┐
│  PHASE 1 — Memory Creation              │
│  • Variables → stored as undefined      │
│  • Functions → entire code stored       │
└─────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────┐
│  PHASE 2 — Code Execution               │
│  • Variables assigned real values       │
│  • Function call? → New EC created      │
│    └─ Pushed to Call Stack              │
│    └─ Runs its own 2 phases             │
│    └─ Returns value, EC destroyed       │
│    └─ Popped from Call Stack            │
└─────────────────────────────────────────┘
        ↓
Program finishes → GEC popped → Stack empty
```

---

### Key Concepts at a Glance

| Concept                     | Summary                                                                  |
|-----------------------------|--------------------------------------------------------------------------|
| **Execution Context**       | The environment in which JavaScript code is evaluated and executed       |
| **Memory Component**        | Stores variables (`undefined`) and functions (full code) before execution |
| **Code Component**          | Executes code line by line during Phase 2                                |
| **Phase 1 (Memory)**        | All variables → `undefined`, all functions → full code stored            |
| **Phase 2 (Execution)**     | Variables updated, functions invoked, new ECs created as needed          |
| **Local Execution Context** | Created for every function call; deleted after `return`                  |
| **Call Stack**              | Tracks all active execution contexts using LIFO ordering                 |
| **Global Execution Context**| Always at the bottom of the Call Stack; removed when script finishes     |

---

## Technology Stack

| Component     | Detail                                              |
|---------------|-----------------------------------------------------|
| **Language**  | JavaScript                                          |
| **Concept**   | Runtime Internals — Execution Model                 |
| **Purpose**   | Understanding how JS code runs behind the scenes    |

---

*For further reading, refer to the [MDN Web Docs on the JavaScript Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop) and the [ECMAScript Specification on Execution Contexts](https://tc39.es/ecma262/#sec-execution-contexts).*
