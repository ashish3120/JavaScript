# JavaScript Event Loop, Callback Queue & Microtask Queue – Async Internals

> JavaScript is single-threaded — yet it handles timers, network requests, and user events simultaneously. This guide explains exactly how that's possible, through the Event Loop, Web APIs, and the two task queues that power asynchronous JavaScript.

---

## Table of Contents

1. [JavaScript Engine & Runtime Environment](#1-javascript-engine--runtime-environment)
2. [How `setTimeout` Works Internally](#2-how-settimeout-works-internally)
3. [The Event Loop & Callback Queue](#3-the-event-loop--callback-queue)
4. [The Microtask Queue](#4-the-microtask-queue)
5. [Summary of the Complete Workflow](#5-summary-of-the-complete-workflow)
6. [Key Takeaways](#6-key-takeaways)

---

## 1. JavaScript Engine & Runtime Environment

### JavaScript on Its Own

JavaScript is a **synchronous, single-threaded** language. It has a single **Call Stack** where all code is executed line by line, one at a time.

```
JavaScript Engine:
┌──────────────────────────┐
│        CALL STACK        │
│                          │
│  (executes code here,    │
│   one line at a time)    │
└──────────────────────────┘
```

On its own, JavaScript has no concept of timers, network requests, or DOM events. These come from its **runtime environment** — the browser.

---

### The Browser's Superpowers — Web APIs

The browser is far more than just a JavaScript engine. It provides additional capabilities called **Web APIs**, which are made available to the JS engine through the **`window` global object**:

| Web API          | Purpose                                         |
|------------------|-------------------------------------------------|
| `setTimeout`     | Schedule a callback after a delay               |
| `fetch`          | Make HTTP / network requests                    |
| `localStorage`   | Store data persistently in the browser          |
| `console`        | Output to the browser's developer console       |
| DOM APIs         | Access and manipulate HTML elements             |
| `addEventListener` | Attach event handlers to DOM elements         |

```
Browser Runtime Environment:
┌──────────────────────────────────────────────────────────┐
│                                                          │
│   ┌──────────────────┐     ┌──────────────────────────┐ │
│   │  JS ENGINE       │     │       WEB APIs           │ │
│   │                  │←────│  setTimeout, fetch,      │ │
│   │  Call Stack      │     │  DOM, localStorage,      │ │
│   │                  │     │  console, ...            │ │
│   └──────────────────┘     └──────────────────────────┘ │
│         ↑                                                │
│     via window object                                    │
└──────────────────────────────────────────────────────────┘
```

> The JS engine accesses all Web APIs through the `window` global object. For example, `setTimeout(...)` is actually `window.setTimeout(...)`.

---

## 2. How `setTimeout` Works Internally

`setTimeout` is not a JavaScript feature — it is a **Web API provided by the browser**. Here is exactly what happens when it is called:

### Step-by-Step Execution

```javascript
console.log("Start");

setTimeout(function cb() {
    console.log("Inside callback");
}, 2000);

console.log("End");

// Output:
// Start
// End
// Inside callback   ← appears after 2 seconds
```

### Internal Flow

```
Step 1: console.log("Start") → executes on Call Stack

Step 2: setTimeout(cb, 2000) encountered
        → JS calls the setTimeout Web API via window
        → Browser starts a 2000ms timer in its own environment
        → JS does NOT wait — immediately moves to next line

Step 3: console.log("End") → executes on Call Stack

Step 4: Call Stack is now empty
        → 2000ms timer expires in the browser
        → cb() is sent to the Callback Queue

Step 5: Event Loop sees Call Stack is empty
        → Moves cb() from Callback Queue to Call Stack

Step 6: cb() executes → "Inside callback" printed
```

---

## 3. The Event Loop & Callback Queue

### The Callback Queue (Task Queue)

When an asynchronous task completes (a timer expires, a DOM event fires), its callback is **not immediately pushed to the Call Stack**. Instead, it is placed in the **Callback Queue**, where it waits for its turn.

Sources that send callbacks to the Callback Queue:
- `setTimeout` and `setInterval`
- DOM event listeners (click, keypress, scroll, etc.)
- `setImmediate` (Node.js)

---

### The Event Loop

The **Event Loop** has one simple but critical job:

> Continuously monitor the **Call Stack** and the **Callback Queue**. If the Call Stack is empty, take the first item from the queue and push it onto the Call Stack.

```
Event Loop — continuous check:

┌─────────────────────────────────────────┐
│                                         │
│   Is the Call Stack empty?              │
│                                         │
│   YES →  Take first item from queue     │
│           Push it to the Call Stack     │
│           Let it execute                │
│                                         │
│   NO  →  Wait. Do nothing.             │
│                                         │
└─────────────────────────────────────────┘
          ↑ repeats continuously ("ticks")
```

---

### Full Picture — Call Stack + Web APIs + Callback Queue + Event Loop

```
┌──────────────────────────────────────────────────────────────────┐
│                    BROWSER ENVIRONMENT                           │
│                                                                  │
│  ┌───────────────┐    ┌──────────────────┐   ┌───────────────┐  │
│  │  CALL STACK   │    │    WEB APIs      │   │ CALLBACK      │  │
│  │               │    │                  │   │ QUEUE         │  │
│  │  main()       │    │  timer: 2000ms   │   │               │  │
│  │  console.log  │    │  fetch request   │   │  cb1()        │  │
│  │               │    │  DOM listener    │   │  cb2()        │  │
│  └───────────────┘    └──────────────────┘   └───────────────┘  │
│          ↑                    │                      │           │
│          └────────────────────┘──────────────────────┘           │
│                         EVENT LOOP                               │
│              (monitors stack + queue continuously)               │
└──────────────────────────────────────────────────────────────────┘
```

---

## 4. The Microtask Queue

The **Microtask Queue** is a second queue, similar to the Callback Queue — but with **higher priority**.

---

### What Goes Into the Microtask Queue?

| Source                    | Queue it Goes To      |
|---------------------------|-----------------------|
| `Promise.then()`          | ✅ Microtask Queue    |
| `Promise.catch()`         | ✅ Microtask Queue    |
| `MutationObserver`        | ✅ Microtask Queue    |
| `setTimeout`              | ❌ Callback Queue     |
| `setInterval`             | ❌ Callback Queue     |
| DOM events (click, etc.)  | ❌ Callback Queue     |

---

### Priority Rule

> The Event Loop **always clears the entire Microtask Queue** before it processes even a single task from the Callback Queue.

```javascript
console.log("Start");

setTimeout(function() {
    console.log("setTimeout callback");  // Callback Queue
}, 0);

Promise.resolve().then(function() {
    console.log("Promise callback");     // Microtask Queue
});

console.log("End");

// Output:
// Start
// End
// Promise callback    ← Microtask Queue runs first
// setTimeout callback ← Callback Queue runs after
```

---

### Event Loop Priority — Visualized

```
Call Stack becomes empty
        ↓
Event Loop checks Microtask Queue first
        ↓
┌───────────────────────────────────────────┐
│  Microtask Queue empty?                   │
│                                           │
│  NO  → Execute all microtasks             │
│        (including any newly added ones)   │
│        Repeat until queue is empty        │
│                                           │
│  YES → Check Callback Queue               │
│        Execute ONE task                   │
│        Then check Microtask Queue again   │
└───────────────────────────────────────────┘
```

---

### Starvation

**Starvation** is a critical edge case. If microtasks keep generating new microtasks indefinitely, the Callback Queue tasks will **never get a chance to run**:

```javascript
// ❌ Starvation — Microtask Queue never empties
function recursiveMicrotask() {
    Promise.resolve().then(function() {
        console.log("Microtask");
        recursiveMicrotask();  // Keeps adding more microtasks
    });
}

setTimeout(function() {
    console.log("setTimeout — will NEVER run");  // Starved ❌
}, 0);

recursiveMicrotask();
```

> If microtasks continuously schedule new microtasks, `setTimeout` callbacks — and all Callback Queue tasks — are permanently blocked.

---

## 5. Summary of the Complete Workflow

```
[1] Code enters the Call Stack
    → Executes synchronously, line by line
        ↓
[2] Async task encountered (setTimeout, fetch, addEventListener)
    → Offloaded to the appropriate Web API
    → JS continues immediately — does NOT wait
        ↓
[3] Async task completes in the Web API environment
    → Callback moves to the appropriate queue:
        Promise callbacks  → Microtask Queue
        Timer/DOM callbacks → Callback Queue
        ↓
[4] Call Stack becomes empty
        ↓
[5] Event Loop checks Microtask Queue FIRST
    → Runs ALL microtasks (including newly added ones)
        ↓
[6] Event Loop checks Callback Queue
    → Runs ONE task
    → Goes back to step [5] (checks Microtask Queue again)
        ↓
[7] Repeat until both queues are empty
```

---

### Three-Queue Execution Order Example

```javascript
console.log("1 - Sync");

setTimeout(() => console.log("2 - setTimeout"), 0);

Promise.resolve()
    .then(() => console.log("3 - Promise 1"))
    .then(() => console.log("4 - Promise 2"));

console.log("5 - Sync");

// Output order:
// 1 - Sync           ← Call Stack (synchronous)
// 5 - Sync           ← Call Stack (synchronous)
// 3 - Promise 1      ← Microtask Queue (higher priority)
// 4 - Promise 2      ← Microtask Queue (chained, also microtask)
// 2 - setTimeout     ← Callback Queue (runs last)
```

---

## 6. Key Takeaways

### Core Concepts Summary

| Concept              | Description                                                                       |
|----------------------|-----------------------------------------------------------------------------------|
| **Call Stack**       | Where JS executes code — single-threaded, one task at a time                     |
| **Web APIs**         | Browser-provided features (setTimeout, fetch, DOM) accessible via `window`       |
| **Callback Queue**   | Holds callbacks from timers and DOM events — waits for Call Stack to empty       |
| **Microtask Queue**  | Holds Promise and MutationObserver callbacks — always processed before Callback Queue |
| **Event Loop**       | Monitors Call Stack and queues — moves tasks when the stack is empty             |
| **Priority**         | Microtask Queue > Callback Queue — always                                        |
| **Starvation**       | Recursive microtasks can permanently block the Callback Queue                    |

---

### Queue Priority Reference

```
Execution Priority (highest → lowest):

[1] Synchronous code (Call Stack)      ← runs first, always
[2] Microtask Queue                    ← all cleared before Callback Queue
    └── Promise.then / catch
    └── MutationObserver
[3] Callback Queue                     ← runs after microtasks are empty
    └── setTimeout / setInterval
    └── DOM events (click, scroll…)
```

---

### Quick Rule Reference

```
✅ setTimeout callback        → Callback Queue
✅ Promise.then callback      → Microtask Queue
✅ Microtask Queue            → always before Callback Queue
✅ Event Loop                 → only moves tasks when Call Stack is empty
⚠️  Recursive microtasks      → can starve the Callback Queue (starvation)
❌ JS does not wait at async  → offloads and moves on immediately
```

---

## Technology Stack

| Component    | Detail                                                                    |
|--------------|---------------------------------------------------------------------------|
| **Language** | JavaScript                                                                |
| **Concept**  | Event Loop, Web APIs, Callback Queue, Microtask Queue, Async Execution    |
| **Purpose**  | Understanding how JS handles asynchronous tasks in a single-threaded model |

---

*For further reading, refer to [MDN Web Docs on the Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop) and [Microtask Guide](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide).*
