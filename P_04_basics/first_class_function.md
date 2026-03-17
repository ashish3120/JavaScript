# JavaScript Functions – Complete Notes

## 📌 Overview

This document covers key concepts of functions in JavaScript, including:

* Function Declaration vs Expression
* Anonymous Functions
* Named Function Expressions
* Parameters vs Arguments
* First Class Functions

---

## 1️⃣ Function Statement vs Function Expression

### 🔹 Function Statement (Function Declaration)

A function declared using the `function` keyword with a name.

```js
function greet() {
    console.log("Hello");
}
```

### ✅ Key Point:

* **Fully hoisted**
* Can be called **before definition**

```js
greet(); // ✅ Works

function greet() {
    console.log("Hello");
}
```

---

### 🔹 Function Expression

A function assigned to a variable.

```js
var greet = function() {
    console.log("Hello");
};
```

### ❌ Key Point:

* **Not hoisted like function declarations**
* Calling before assignment → **TypeError**

```js
greet(); // ❌ Error

var greet = function() {
    console.log("Hello");
};
```

---

## ⚡ Hoisting Difference (Important)

| Feature              | Function Declaration | Function Expression             |
| -------------------- | -------------------- | ------------------------------- |
| Hoisted              | ✅ Yes                | ❌ No (only variable is hoisted) |
| Callable before def? | ✅ Yes                | ❌ No                            |

---

## 2️⃣ Anonymous Functions

### 🔹 Definition

A function **without a name**.

```js
function() {
    console.log("Hello");
}
```

### ❌ Problem

This will throw a **SyntaxError** if used directly as a statement.

### ✅ Correct Usage

Anonymous functions are used:

* Inside function expressions
* As arguments

```js
var greet = function() {
    console.log("Hello");
};

setTimeout(function() {
    console.log("Executed later");
}, 1000);
```

---

## 3️⃣ Named Function Expression

A function expression where the function has a name.

```js
var greet = function sayHello() {
    console.log("Hello");
};
```

### ⚠️ Important Gotcha

* `sayHello` is **only accessible inside the function**
* Not available in global scope

```js
sayHello(); // ❌ ReferenceError
```

---

## 4️⃣ Parameters vs Arguments

### 🔹 Parameters

Variables defined in function declaration.

```js
function add(a, b) {
    return a + b;
}
```

### 🔹 Arguments

Actual values passed during function call.

```js
add(2, 3); // 2 and 3 are arguments
```

---

## 5️⃣ First Class Functions (First Class Citizens)

JavaScript treats functions like **values**.

### 🔥 This means:

### ✅ 1. Functions can be assigned to variables

```js
var greet = function() {
    console.log("Hello");
};
```

### ✅ 2. Functions can be passed as arguments

```js
function execute(fn) {
    fn();
}

execute(function() {
    console.log("Running...");
});
```

### ✅ 3. Functions can be returned from other functions

```js
function outer() {
    return function() {
        console.log("Returned function");
    };
}

var fn = outer();
fn();
```

---

## 🎯 Key Takeaways

* Function declarations are **hoisted**, expressions are not.
* Anonymous functions are used as **values**, not standalone statements.
* Named function expressions have **limited scope**.
* Parameters ≠ Arguments (don’t mix them up).
* Functions in JavaScript are **First Class Citizens** → extremely powerful.

---

## 🚀 Bonus Insight (Important for Interviews)

Understanding these concepts helps you master:

* Closures
* Callbacks
* Higher-order functions
* Async JavaScript (Promises, Async/Await)

If you don’t understand this deeply, you’ll struggle later. Period.
