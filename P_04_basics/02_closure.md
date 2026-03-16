# JavaScript Closures – Complete Guide

> Closures are one of the most powerful and frequently tested concepts in JavaScript. Understanding closures unlocks a deeper understanding of scope, state, and how modern JavaScript patterns are built.

---

## Table of Contents

1. [What is a Closure?](#1-what-is-a-closure)
2. [How Closures Work](#2-how-closures-work)
3. [Key Characteristics](#3-key-characteristics)
4. [Practical Uses of Closures](#4-practical-uses-of-closures)
5. [Key Takeaways](#5-key-takeaways)

---

## 1. What is a Closure?

> **A closure is a function bundled together with its lexical environment.**

In simpler terms: a closure gives an inner function access to its outer function's scope — **even after the outer function has finished executing**.

```javascript
function outer() {
    let count = 0;

    function inner() {
        count++;
        console.log(count);
    }

    return inner;
}

const fn = outer();  // outer() finishes — its EC is popped from the stack
fn();  // 1  — inner still accesses count from outer's scope ✅
fn();  // 2
fn();  // 3
```

> **Every function created in JavaScript forms a closure** — it always carries a reference to the scope in which it was created.

---

## 2. How Closures Work

When a function is **returned from another function**, it doesn't just return its code. It returns a **closure** — the function code bundled with the entire lexical scope it had access to at the time of creation.

---

### The Standard Closure Pattern

```javascript
function makeGreeter(greeting) {
    return function(name) {
        console.log(greeting + ", " + name + "!");
    };
}

const sayHello = makeGreeter("Hello");
const sayHi    = makeGreeter("Hi");

sayHello("Alice");  // "Hello, Alice!"
sayHi("Bob");       // "Hi, Bob!"
```

Even after `makeGreeter()` has finished executing and its Execution Context has been removed from the Call Stack, the returned function still has access to `greeting` — because it closed over it.

---

### What Gets Returned

```
makeGreeter("Hello") returns:
┌────────────────────────────────────────────────┐
│                   CLOSURE                      │
│                                                │
│  Function code:                                │
│  function(name) { console.log(greeting+name) } │
│                                                │
│  Lexical Environment (captured):               │
│  ┌─────────────┬──────────┐                   │
│  │  greeting   │ "Hello"  │                   │
│  └─────────────┴──────────┘                   │
└────────────────────────────────────────────────┘
```

---

### Memory After Outer Function Returns

```
Call Stack after makeGreeter("Hello") finishes:
┌──────────────────────┐
│  anonymous (GEC)     │  ← makeGreeter's EC was popped
└──────────────────────┘

BUT: sayHello still holds a reference to the closure,
     keeping `greeting = "Hello"` alive in memory.
```

> The JavaScript engine does not garbage-collect the outer function's variables as long as any closure still references them.

---

## 3. Key Characteristics

### References, Not Values

Closures capture a **reference** to the outer variable — not a snapshot of its value at the time the closure was created. If the variable changes before the closure is called, the closure will see the **updated value**.

```javascript
function counter() {
    let n = 0;

    return {
        increment: function() { n++; },
        getValue:  function() { return n; }
    };
}

const c = counter();
c.increment();
c.increment();
console.log(c.getValue());  // 2 — closure sees the latest value of n
```

```
n is not copied into the closure — it is referenced:
  increment → modifies n directly
  getValue  → reads n directly
  Both share the same n
```

---

### A Common Pitfall — `var` in Loops

Because closures capture **references**, using `var` inside a loop creates a classic bug:

```javascript
// ❌ Bug — all callbacks share the same reference to i
for (var i = 1; i <= 3; i++) {
    setTimeout(function() {
        console.log(i);  // Prints 4, 4, 4 — not 1, 2, 3
    }, i * 1000);
}

// ✅ Fix — use let (block-scoped, new binding per iteration)
for (let i = 1; i <= 3; i++) {
    setTimeout(function() {
        console.log(i);  // Prints 1, 2, 3 correctly
    }, i * 1000);
}
```

---

### Deep Nesting — Closures Climb the Entire Chain

Closures work across **any depth of nesting**. An innermost function has access to variables from all its ancestor functions — the entire lexical chain.

```javascript
function a() {
    let x = 10;

    function b() {
        let y = 20;

        function c() {
            let z = 30;
            console.log(x + y + z);  // 60 — accesses all three scopes ✅
        }

        c();
    }

    b();
}

a();
```

```
c's Closure captures:
  z = 30        (c's own scope)
  y = 20        (b's scope — one level up)
  x = 10        (a's scope — two levels up)
```

---

## 4. Practical Uses of Closures

Closures are not just a theoretical concept — they are the foundation of many essential JavaScript patterns:

| Use Case                  | Description                                                                 |
|---------------------------|-----------------------------------------------------------------------------|
| **Module Design Pattern** | Encapsulate private data and expose only a public API                       |
| **Currying**              | Transform a multi-argument function into a chain of single-argument functions |
| **Function Factories**    | Create specialized functions with pre-set configuration or data             |
| **Memoization**           | Cache the results of expensive function calls to improve performance         |
| **Data Hiding / Encapsulation** | Protect internal state from being accessed or modified directly       |
| **`setTimeout` & Event Listeners** | Maintain access to variables after asynchronous delays or events  |

---

### Module Design Pattern

```javascript
function BankAccount(initialBalance) {
    let balance = initialBalance;  // Private — not accessible from outside

    return {
        deposit:  function(amount) { balance += amount; },
        withdraw: function(amount) { balance -= amount; },
        getBalance: function()     { return balance; }
    };
}

const account = BankAccount(100);
account.deposit(50);
console.log(account.getBalance());  // 150
console.log(balance);               // ❌ ReferenceError — balance is private
```

---

### Function Factory

```javascript
function multiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
```

---

### Memoization

```javascript
function memoize(fn) {
    const cache = {};  // Private cache — lives in the closure

    return function(n) {
        if (cache[n] !== undefined) {
            return cache[n];   // Return cached result
        }
        cache[n] = fn(n);
        return cache[n];
    };
}

const slowSquare = (n) => n * n;
const fastSquare = memoize(slowSquare);

console.log(fastSquare(5));  // Calculated: 25
console.log(fastSquare(5));  // From cache: 25
```

---

## 5. Key Takeaways

> **A closure is "a function along with its lexical environment." It allows a function to maintain access to its parent scope's variables long after the parent function has completed.**

---

### Core Concepts Summary

| Concept                         | Description                                                                       |
|---------------------------------|-----------------------------------------------------------------------------------|
| **Closure definition**          | A function bundled with its lexical environment                                   |
| **When created**                | Every time a function is created in JavaScript                                    |
| **What it captures**            | References to outer scope variables — not copies                                  |
| **After outer function returns**| Inner function still accesses outer variables via the closure                     |
| **Deep nesting**                | Closures capture the entire lexical chain — all ancestor scopes                   |
| **Reference vs value**          | Closures see updated values — changes to outer vars are reflected in the closure  |
| **Memory**                      | Outer variables are kept alive as long as any closure references them             |

---

### Closure Lifecycle

```
Outer function is called
        ↓
Outer function's Execution Context created
        ↓
Inner function is created — closure is formed
(inner function + reference to outer's lexical env)
        ↓
Outer function returns inner function
        ↓
Outer function's EC is popped from Call Stack
        ↓
Outer variables are NOT garbage-collected
(closure still holds a reference to them)
        ↓
Inner function is called later
        ↓
Inner function accesses outer variables via closure ✅
        ↓
When all references to the closure are gone →
outer variables are finally garbage-collected
```

---

### Quick Rule Reference

```
✅ Inner function accesses outer variable → Works (closure)
✅ Outer function has returned → Inner still works (closure)
✅ Deeply nested inner function → Accesses entire lexical chain
✅ Outer variable changes → Closure sees the new value (reference)
⚠️  var in loops + closures → Classic bug (use let instead)
```

---

## Technology Stack

| Component    | Detail                                                           |
|--------------|------------------------------------------------------------------|
| **Language** | JavaScript                                                       |
| **Concept**  | Closures, Lexical Environment, Scope Chain, Function Factories   |
| **Purpose**  | State management, encapsulation, and advanced functional patterns |

---

*For further reading, refer to [MDN Web Docs on Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) — one of the most comprehensive resources on this topic.*
