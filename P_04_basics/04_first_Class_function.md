# JavaScript Function Types – Declarations, Expressions & First Class Functions

> JavaScript offers multiple ways to define functions — and each behaves differently when it comes to hoisting, scope, and how they can be used. Understanding these distinctions is essential for both interviews and writing predictable code.

---

## Table of Contents

1. [Function Statement vs. Function Expression](#1-function-statement-vs-function-expression)
2. [Anonymous Functions](#2-anonymous-functions)
3. [Named Function Expression](#3-named-function-expression)
4. [Parameters vs. Arguments](#4-parameters-vs-arguments)
5. [First Class Functions (First Class Citizens)](#5-first-class-functions-first-class-citizens)
6. [Key Takeaways](#6-key-takeaways)

---

## 1. Function Statement vs. Function Expression

The most fundamental distinction in JavaScript function types — and the most common interview question.

---

### Function Statement (Function Declaration)

A function defined using the `function` keyword followed by a name:

```javascript
function a() {
    console.log("I am a function statement");
}

a();  // ✅ Works
```

**Hoisting behaviour:**

The entire function body is stored in memory during the **Memory Creation Phase**. This means you can call it **before** its definition in the code:

```javascript
a();  // ✅ Works — "I am a function statement"

function a() {
    console.log("I am a function statement");
}
```

---

### Function Expression

A function assigned to a variable:

```javascript
var b = function() {
    console.log("I am a function expression");
};

b();  // ✅ Works
```

**Hoisting behaviour:**

The variable `b` is treated like any other `var` — it is initialized to `undefined` during the Memory Creation Phase. The function is only assigned when that line is executed:

```javascript
b();  // ❌ TypeError: b is not a function

var b = function() {
    console.log("I am a function expression");
};
```

```
Memory after Phase 1:
┌──────┬───────────┐
│  b   │ undefined │  ← b is not yet a function
└──────┴───────────┘

After line executes:
┌──────┬──────────────────────┐
│  b   │  function() { ... }  │  ← now a function
└──────┴──────────────────────┘
```

---

### Function Statement vs. Function Expression — Comparison

| Feature                      | Function Statement          | Function Expression              |
|------------------------------|-----------------------------|----------------------------------|
| Syntax                       | `function a() { ... }`      | `var b = function() { ... }`     |
| Has a name                   | ✅ Yes (required)           | ❌ Optional                      |
| Hoisted                      | ✅ Fully — entire code      | ⚠️ Partially — variable only (`undefined`) |
| Callable before declaration  | ✅ Yes                      | ❌ No — `TypeError`              |
| When is it a function?       | From the start of execution | Only after the assignment line runs |

> **The major difference between a function statement and an expression is hoisting** — which fundamentally impacts how and when they can be called.

---

## 2. Anonymous Functions

An **anonymous function** is a function with **no name**:

```javascript
function() {
    console.log("I have no name");
}
```

---

### Limitation — Cannot Stand Alone

An anonymous function used as a standalone statement throws a `SyntaxError`:

```javascript
function() { ... }  // ❌ SyntaxError: Function statements require a function name
```

This is because the JavaScript engine expects a function *statement* to have a name. Without one, the syntax is invalid.

---

### Valid Use Cases

Anonymous functions are designed to be used **as values** — not as standalone statements:

```javascript
// As a function expression
var greet = function() {
    console.log("Hello!");
};

// As an argument (callback)
setTimeout(function() {
    console.log("Runs after 1 second");
}, 1000);

// As a returned value
function outer() {
    return function() {
        console.log("I am anonymous and returned");
    };
}
```

| Context                    | Example                              | Valid? |
|----------------------------|--------------------------------------|--------|
| Standalone statement       | `function() { ... }`                | ❌ SyntaxError |
| Assigned to variable       | `var f = function() { ... }`        | ✅ Yes |
| Passed as argument         | `setTimeout(function() { ... }, 0)` | ✅ Yes |
| Returned from function     | `return function() { ... }`         | ✅ Yes |

---

## 3. Named Function Expression

A **Named Function Expression** is a function expression where the assigned function also has its own internal name:

```javascript
var b = function xyz() {
    console.log("I am a named function expression");
};

b();    // ✅ Works — called via the variable
xyz();  // ❌ ReferenceError: xyz is not defined
```

---

### The Scope of the Internal Name

The name `xyz` is **local to the function's own scope only**. It is not accessible in the outer (global) scope. However, it can be referenced **inside the function itself** — useful for recursion:

```javascript
var factorial = function calc(n) {
    if (n <= 1) return 1;
    return n * calc(n - 1);  // ✅ calc is accessible inside itself
};

factorial(5);  // ✅ 120
calc(5);       // ❌ ReferenceError: calc is not defined
```

---

### Named vs. Anonymous Function Expression

| Feature                          | Anonymous Expression       | Named Expression              |
|----------------------------------|----------------------------|-------------------------------|
| Syntax                           | `var b = function() { }`   | `var b = function xyz() { }`  |
| Internal name accessible inside  | ❌ No                      | ✅ Yes — useful for recursion |
| Internal name accessible outside | N/A                        | ❌ No — `ReferenceError`      |
| Useful for debugging             | ❌ Shows as "anonymous"    | ✅ Shows name in stack traces |

---

## 4. Parameters vs. Arguments

These two terms are often used interchangeably — but they refer to different things:

```javascript
function add(param1, param2) {   // ← param1, param2 are PARAMETERS
    return param1 + param2;
}

add(1, 2);  // ← 1 and 2 are ARGUMENTS
```

| Term           | Definition                                                        | Where It Appears           |
|----------------|-------------------------------------------------------------------|----------------------------|
| **Parameter**  | The placeholder/label defined in the function signature           | Function definition         |
| **Argument**   | The actual value passed to the function when it is invoked        | Function call               |

```
function add( param1, param2 )   ← Parameters
              ──────  ──────

add(          1,      2      )   ← Arguments
              ─  ─   ─
```

---

## 5. First Class Functions (First Class Citizens)

**First Class Functions** refers to the ability of functions in JavaScript to be treated like any other value. This is one of JavaScript's most powerful features.

A function is a "First Class Citizen" because it can:

---

### 1 — Be Assigned to a Variable

```javascript
var greet = function() {
    console.log("Hello!");
};
```

---

### 2 — Be Passed as an Argument to Another Function

```javascript
function execute(fn) {
    fn();  // Call the passed function
}

execute(function() {
    console.log("I was passed as an argument!");
});
// Output: "I was passed as an argument!"
```

---

### 3 — Be Returned from Another Function

```javascript
function multiplier(factor) {
    return function(number) {      // Function returned as a value
        return number * factor;
    };
}

const double = multiplier(2);
console.log(double(5));  // 10
console.log(double(9));  // 18
```

---

### First Class Functions Summary

| Capability                          | Example                                  | Possible in JS? |
|-------------------------------------|------------------------------------------|-----------------|
| Assign to a variable                | `var f = function() { }`                | ✅ Yes          |
| Pass as argument to a function      | `execute(function() { })`               | ✅ Yes          |
| Return from a function              | `return function() { }`                 | ✅ Yes          |
| Store in a data structure           | `arr.push(function() { })`              | ✅ Yes          |

> This flexibility is what enables powerful patterns like **callbacks**, **closures**, **currying**, and **higher-order functions** in JavaScript.

---

## 6. Key Takeaways

> **The major difference between a function statement and an expression is how they are hoisted — which fundamentally impacts how and when they can be called in your program.**

---

### All Function Types at a Glance

```javascript
// Function Statement — fully hoisted
function a() { console.log("statement"); }

// Function Expression — variable hoisted as undefined
var b = function() { console.log("expression"); };

// Anonymous Function — only valid as a value
var c = function() { console.log("anonymous"); };

// Named Function Expression — internal name is scope-limited
var d = function xyz() { console.log("named expression"); };

// First Class — passed as argument
setTimeout(function() { console.log("passed as arg"); }, 1000);

// First Class — returned from function
function outer() { return function() { console.log("returned"); }; }
```

---

### Hoisting Quick Reference

| Function Type              | Hoisted As          | Callable Before Declaration? |
|----------------------------|---------------------|------------------------------|
| Function Statement         | Full function code  | ✅ Yes                       |
| Function Expression (`var`)| `undefined`         | ❌ No — `TypeError`          |
| Named Function Expression  | `undefined`         | ❌ No — `TypeError`          |
| Anonymous Function         | `undefined`         | ❌ No — `TypeError`          |

---

### Core Concepts Summary

| Concept                   | Description                                                                       |
|---------------------------|-----------------------------------------------------------------------------------|
| **Function Statement**    | Named function using `function` keyword — fully hoisted                           |
| **Function Expression**   | Function assigned to a variable — hoisted as `undefined`                          |
| **Anonymous Function**    | Function with no name — must be used as a value, not a standalone statement       |
| **Named Function Expression** | Function expression with an internal name — name is local to function scope  |
| **Parameter**             | Placeholder in the function definition                                            |
| **Argument**              | Actual value passed during function invocation                                    |
| **First Class Functions** | Functions can be assigned, passed as arguments, and returned like any other value |

---

## Technology Stack

| Component    | Detail                                                                  |
|--------------|-------------------------------------------------------------------------|
| **Language** | JavaScript                                                              |
| **Concept**  | Function Types, Hoisting, Anonymous Functions, First Class Functions    |
| **Purpose**  | Writing predictable functions and mastering JS interview fundamentals   |

---

*For further reading, refer to [MDN Web Docs on Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) and [First-class Function](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function).*
