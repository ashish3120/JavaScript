# JavaScript – The Shortest Program, `window` & Global Space

> The shortest JavaScript program is an empty file. Yet even with zero lines of code, the JavaScript engine performs critical setup work behind the scenes — creating the foundation every program runs on.

---

## Table of Contents

1. [What Happens When You Run an Empty JS File?](#1-what-happens-when-you-run-an-empty-js-file)
2. [The `window` Object](#2-the-window-object)
3. [The `this` Keyword](#3-the-this-keyword)
4. [What is Global Space?](#4-what-is-global-space)
5. [Key Takeaways](#5-key-takeaways)

---

## 1. What Happens When You Run an Empty JS File?

Consider a JavaScript file with absolutely nothing in it:

```javascript
// empty file
```

Even with no code, the JavaScript engine **automatically performs the following** before execution begins:

| Action                              | Description                                                          |
|-------------------------------------|----------------------------------------------------------------------|
| Creates a **Global Execution Context** | The environment that wraps all JavaScript execution                |
| Sets up a **Call Stack**            | The structure that manages execution context order                   |
| Creates the **Global Object**       | A built-in object (`window` in browsers) with built-in methods/vars  |
| Creates the **`this` keyword**      | A special reference automatically linked to the Global Object        |

```
Empty JS file runs
        ↓
┌──────────────────────────────────────────────┐
│         GLOBAL EXECUTION CONTEXT             │
│                                              │
│  ┌─────────────────┐  ┌────────────────────┐ │
│  │     MEMORY      │  │       CODE         │ │
│  │   (empty)       │  │    (empty)         │ │
│  └─────────────────┘  └────────────────────┘ │
│                                              │
│  window → { ... }   this → window            │
└──────────────────────────────────────────────┘
```

> This is why `window` and `this` are always available in any JavaScript program — they are created **before your code runs**, not by your code.

---

## 2. The `window` Object

The `window` object is the **Global Object** created automatically by the JavaScript engine in a browser environment. It is a large container of built-in functions, variables, and browser APIs available to every script.

```javascript
// In the browser console — these are all pre-populated
window.alert("Hello!");
window.setTimeout(() => {}, 1000);
window.location.href;
window.innerWidth;
// ...and hundreds more
```

---

### Global Object Across Environments

Every JavaScript engine has the responsibility to create a **global object** — but its name differs depending on where JavaScript runs:

| Environment      | JS Engine        | Global Object Name |
|------------------|------------------|--------------------|
| **Browser**      | V8 (Chrome), SpiderMonkey (Firefox), JavaScriptCore (Safari) | `window` |
| **Node.js**      | V8               | `global`           |
| **Web Workers**  | Varies           | `self`             |

> The concept is universal — only the name changes depending on the host environment.

---

### What `window` Contains

```javascript
// window is pre-loaded with built-in capabilities:
console.log(typeof window.alert);       // "function"
console.log(typeof window.setTimeout);  // "function"
console.log(typeof window.document);    // "object"
console.log(typeof window.location);    // "object"
```

---

## 3. The `this` Keyword

At the **global level**, the JavaScript engine automatically creates a special keyword called `this`.

### `this` in the Global Execution Context

In the Global Execution Context, `this` points directly to the **Global Object**:

```javascript
console.log(this);           // Window { ... }
console.log(this === window); // true
```

```
Global Execution Context:
  this  ──────────────────→  window (Global Object)
```

> `this` and `window` are not two separate things at the global level — they are **the same object**, referenced by two different names.

---

### Verifying in the Console

```javascript
this === window   // true
```

This holds true as long as you are at the **global scope** (not inside a function or class). The value of `this` changes depending on context — but at the global level, it always equals `window` in browsers.

---

## 4. What is Global Space?

**Global Space** refers to any code written **outside of a function** — directly at the top level of your script.

```javascript
var a = 10;           // ← Global space — attached to window

function greet() {    // ← Global space — attached to window
    var b = 20;       // ← NOT global space — local to greet()
}
```

---

### Variables in Global Space → Attached to `window`

Any variable or function declared in the global space is **automatically attached** to the `window` object:

```javascript
var a = 10;

console.log(a);        // 10   — direct access
console.log(window.a); // 10   — via window object
console.log(this.a);   // 10   — via this (= window at global level)
```

All three lines access **the same value** — `a` is a property of `window`.

---

### Global vs. Local Space

| Code Location                  | In Global Space? | Attached to `window`? |
|--------------------------------|------------------|-----------------------|
| `var a = 10;` at top level     | ✅ Yes           | ✅ Yes                |
| `function greet() {}` at top level | ✅ Yes       | ✅ Yes                |
| `var b = 20;` inside a function | ❌ No           | ❌ No                 |
| `var c = 5;` inside a block `{}` (with `var`) | ✅ Yes | ✅ Yes           |

> ⚠️ Note: Variables declared with `let` and `const` in the global space are **not** attached to `window`, even though they are globally scoped. This is a key difference from `var`.

```javascript
var x = 1;
let y = 2;

console.log(window.x); // 1   — attached
console.log(window.y); // undefined — NOT attached
```

---

## 5. Key Takeaways

> **Even without a single line of code, JavaScript sets up a Global Execution Context, a Global Object (`window`), and the `this` keyword — all three linked together — before any user code runs.**

---

### Everything Connected

```
┌──────────────────────────────────────────────────────┐
│               GLOBAL EXECUTION CONTEXT               │
│                                                      │
│   Global Object (window)  ←──────  this             │
│        │                                             │
│        ├── Built-in functions (alert, setTimeout…)   │
│        ├── Browser APIs (document, location…)        │
│        └── Your global vars (window.a, window.fn…)   │
└──────────────────────────────────────────────────────┘
```

---

### Summary Table

| Concept               | Description                                                                   |
|-----------------------|-------------------------------------------------------------------------------|
| **Empty file**        | Still creates GEC, Call Stack, `window`, and `this`                           |
| **`window`**          | The Global Object in browser environments — pre-loaded with built-in tools    |
| **`this` (global)**   | Points to `window` — `this === window` is `true` at the global level          |
| **Global Space**      | Any code written outside a function                                           |
| **`var` in global**   | Automatically becomes a property of `window`                                  |
| **`let`/`const` in global** | Globally scoped but **not** attached to `window`                        |
| **Global Object name**| `window` (browser), `global` (Node.js), `self` (Web Workers)                 |

---

### Full Setup Flow (Empty File)

```
JS engine receives file (even empty)
        ↓
Global Execution Context created
        ↓
Call Stack set up → GEC pushed to bottom
        ↓
Global Object created (window in browsers)
        ↓
this created → points to window
        ↓
Your code runs (if any)
        ↓
Global vars/functions → attached to window automatically
```

---

## Technology Stack

| Component    | Detail                                                     |
|--------------|------------------------------------------------------------|
| **Language** | JavaScript                                                 |
| **Concept**  | Global Execution Context, `window` Object, `this`, Global Space |
| **Purpose**  | Understanding the foundational setup JavaScript performs before code runs |

---

*For further reading, refer to the [MDN Web Docs on the `window` object](https://developer.mozilla.org/en-US/docs/Web/API/Window) and [globalThis](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis).*
