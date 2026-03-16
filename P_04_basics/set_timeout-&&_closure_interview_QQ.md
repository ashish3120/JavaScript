# JavaScript `setTimeout` & Closures – Interview Deep Dive

> One of the most commonly asked JavaScript interview questions involves `setTimeout` inside a loop. Understanding why it behaves unexpectedly — and how to fix it — requires a solid grasp of closures, references, and block scoping.

---

## Table of Contents

1. [`setTimeout` and JavaScript's Non-Blocking Nature](#1-settimeout-and-javascripts-non-blocking-nature)
2. [The Classic For-Loop Interview Question](#2-the-classic-for-loop-interview-question)
3. [Solutions](#3-solutions)
4. [Key Takeaways](#4-key-takeaways)

---

## 1. `setTimeout` and JavaScript's Non-Blocking Nature

A common misconception is that JavaScript **pauses** at a `setTimeout` line and waits for the timer to expire. This is incorrect.

### What Actually Happens

```javascript
console.log("Before");

setTimeout(function() {
    console.log("Inside timeout");
}, 2000);

console.log("After");

// Output:
// Before
// After
// Inside timeout   ← appears 2 seconds later
```

### The `setTimeout` Mechanism

```
JavaScript encounters setTimeout
        ↓
Takes the callback function + attaches a timer
        ↓
Stores the callback away (in the Web APIs environment)
        ↓
Immediately moves to the NEXT line — does NOT wait
        ↓
(Timer runs in background)
        ↓
When timer expires → callback is queued for execution
        ↓
Callback runs after the current script finishes
```

| Misconception                        | Reality                                              |
|--------------------------------------|------------------------------------------------------|
| JS waits at `setTimeout`            | JS moves on immediately — non-blocking               |
| Callback runs exactly after N ms    | Callback runs after N ms AND after current code finishes |
| Timer pauses execution              | Timer runs in the background via Web APIs             |

---

## 2. The Classic For-Loop Interview Question

**The challenge:** Print `1` to `5`, each after its respective number of seconds — `1` after 1s, `2` after 2s, and so on.

---

### The Intuitive (But Broken) Attempt — `var`

```javascript
for (var i = 1; i <= 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, i * 1000);
}
```

**Expected output:**
```
1  (after 1s)
2  (after 2s)
3  (after 3s)
4  (after 4s)
5  (after 5s)
```

**Actual output:**
```
6  (after 1s)
6  (after 2s)
6  (after 3s)
6  (after 4s)
6  (after 5s)
```

---

### Why It Prints `6` Five Times

The root cause is the combination of two behaviors:

**1 — Closures capture references, not values:**

Each `setTimeout` callback forms a closure over `i`. But closures store a **reference** to the variable `i` — not a copy of its value at that moment. All five callbacks point to the **same memory location**.

**2 — `var` is function-scoped, not block-scoped:**

`var i` is not confined to the loop block. There is only **one `i`** shared across all five iterations — stored in the global/function scope.

```
After the loop completes:
  i = 6  ← loop ended when i > 5

All 5 setTimeout callbacks still reference the same i
When timers fire → all read i = 6
```

```
Memory:
┌──────┬──────┐
│  i   │  6   │  ← One shared var, modified by each iteration
└──────┴──────┘
  ↑ all 5 closures point here
```

---

### Visualizing the Reference Problem

```
Iteration 1: setTimeout created → callback refs i → timer starts (1s)
Iteration 2: setTimeout created → callback refs i → timer starts (2s)
Iteration 3: setTimeout created → callback refs i → timer starts (3s)
Iteration 4: setTimeout created → callback refs i → timer starts (4s)
Iteration 5: setTimeout created → callback refs i → timer starts (5s)
Loop ends:   i becomes 6

1s later: callback 1 fires → reads i → 6
2s later: callback 2 fires → reads i → 6
...
```

---

## 3. Solutions

### Solution A — Use `let` (ES6) ✅ Recommended

Simply replacing `var` with `let` fixes the problem entirely:

```javascript
for (let i = 1; i <= 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, i * 1000);
}

// Output:
// 1  (after 1s)
// 2  (after 2s)
// 3  (after 3s)
// 4  (after 4s)
// 5  (after 5s)
```

**Why it works:**

`let` is **block-scoped**. For every iteration of the loop, a **brand new, separate `i`** is created in its own block scope. Each `setTimeout` callback forms a closure with its own unique copy of `i`.

```
Iteration 1: new block → i = 1 → callback closes over THIS i
Iteration 2: new block → i = 2 → callback closes over THIS i
Iteration 3: new block → i = 3 → callback closes over THIS i
...

Memory:
┌──────┬──────┐  ┌──────┬──────┐  ┌──────┬──────┐
│  i   │  1   │  │  i   │  2   │  │  i   │  3   │  ...
└──────┴──────┘  └──────┴──────┘  └──────┴──────┘
  ↑ closure 1      ↑ closure 2      ↑ closure 3
```

---

### Solution B — Extra Closure with `var` (Classic Approach)

If the interviewer **requires `var`** (a common constraint to test deeper closure knowledge), you can manually create a new scope per iteration using a wrapper function:

```javascript
for (var i = 1; i <= 5; i++) {
    function close(x) {
        setTimeout(function() {
            console.log(x);
        }, x * 1000);
    }
    close(i);  // Pass current value of i as an argument
}

// Output:
// 1  (after 1s)
// 2  (after 2s)
// 3  (after 3s)
// 4  (after 4s)
// 5  (after 5s)
```

**Why it works:**

When `close(i)` is called, the **current value of `i`** is passed as an argument. Inside `close`, this value is captured as parameter `x` — a **new local variable** created for every function call. Each `setTimeout` callback closes over its own `x`, not the shared `i`.

```
close(1) called → x = 1 (new local scope) → callback closes over x = 1
close(2) called → x = 2 (new local scope) → callback closes over x = 2
close(3) called → x = 3 (new local scope) → callback closes over x = 3
...

i = 6 after loop — but all callbacks reference their own x, not i
```

---

### Alternative — IIFE (Immediately Invoked Function Expression)

A more compact version of Solution B using an IIFE:

```javascript
for (var i = 1; i <= 5; i++) {
    (function(x) {
        setTimeout(function() {
            console.log(x);
        }, x * 1000);
    })(i);  // Immediately invoked, passing current i
}
```

Same principle — each iteration creates a new function scope with its own `x`.

---

### Solutions Compared

| Approach             | Uses        | How New Scope is Created               | Recommended?    |
|----------------------|-------------|----------------------------------------|-----------------|
| `let` in loop        | `let`       | Block scope — new `i` per iteration    | ✅ Yes — simplest |
| Wrapper function     | `var` + function | New function scope per `close(i)` call | ✅ Yes — when `let` not allowed |
| IIFE                 | `var` + IIFE | Immediately invoked new scope per iteration | ✅ Yes — compact |
| Raw `var` (broken)   | `var`       | No new scope — all refs share one `i`  | ❌ No — buggy   |

---

## 4. Key Takeaways

> **Closures capture references to variables, not their values. `let` creates a new binding per block iteration, solving the classic `setTimeout` + loop problem elegantly.**

---

### Core Concepts Summary

| Concept                          | Explanation                                                                 |
|----------------------------------|-----------------------------------------------------------------------------|
| `setTimeout` is non-blocking     | JS does not wait — moves on immediately; callback runs after timer + current code finishes |
| Closures capture references      | All callbacks in the `var` loop share the same `i` — they don't copy values |
| `var` is function-scoped         | Only one `i` exists across all loop iterations                              |
| `let` is block-scoped            | A fresh `i` is created per iteration — each closure gets its own           |
| Wrapper function fixes `var`     | Passing `i` as an argument creates a new local scope with its own copy      |
| IIFE achieves the same           | Immediately invoked function creates a new scope inline                     |

---

### The Fundamental Rule

```
var in loop + setTimeout = ❌ All callbacks share one reference

let in loop + setTimeout = ✅ Each callback gets its own binding

var + wrapper function  = ✅ Each call creates a new scope
```

---

### Interview Cheat Sheet

```javascript
// ❌ Broken — var, shared reference
for (var i = 1; i <= 5; i++) {
    setTimeout(() => console.log(i), i * 1000);
}
// → 6 6 6 6 6

// ✅ Fix 1 — let, new binding per iteration
for (let i = 1; i <= 5; i++) {
    setTimeout(() => console.log(i), i * 1000);
}
// → 1 2 3 4 5

// ✅ Fix 2 — wrapper function, new scope per call
for (var i = 1; i <= 5; i++) {
    (function(x) {
        setTimeout(() => console.log(x), x * 1000);
    })(i);
}
// → 1 2 3 4 5
```

---

## Technology Stack

| Component    | Detail                                                           |
|--------------|------------------------------------------------------------------|
| **Language** | JavaScript                                                       |
| **Concept**  | `setTimeout`, Closures, Block Scope, `var` vs `let`, IIFE        |
| **Purpose**  | Mastering asynchronous behavior and closure-related interview questions |

---

*For further reading, refer to [MDN Web Docs on `setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) and [Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures).*
