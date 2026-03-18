# JavaScript `map`, `filter` & `reduce` – Array Higher-Order Functions

> `map`, `filter`, and `reduce` are the three most essential Higher-Order Functions in JavaScript. Mastering them allows you to write clean, expressive, functional code — replacing verbose `for` loops with readable, composable operations.

---

## Table of Contents

1. [`map()` — Transforming an Array](#1-map--transforming-an-array)
2. [`filter()` — Selecting Specific Elements](#2-filter--selecting-specific-elements)
3. [`reduce()` — Deriving a Single Value](#3-reduce--deriving-a-single-value)
4. [Chaining Methods](#4-chaining-methods)
5. [Summary & Key Takeaways](#5-summary--key-takeaways)

---

## 1. `map()` — Transforming an Array

### Purpose

`map()` is used when you want to **transform every element** in an array and get back a **new array of the same length**.

```
Input array:   [1, 2, 3, 4, 5]
                ↓  ↓  ↓  ↓  ↓   (apply: x * 2)
Output array:  [2, 4, 6, 8, 10]
```

> The original array is **never modified** — `map` always returns a brand new array.

---

### Syntax

```javascript
const output = arr.map((element) => transformation);
```

---

### Examples

**Multiply every element by 2:**

```javascript
const arr = [1, 2, 3, 4, 5];
const doubled = arr.map((x) => x * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]
```

**Multiply every element by 3:**

```javascript
const tripled = arr.map((x) => x * 3);
console.log(tripled);  // [3, 6, 9, 12, 15]
```

**Convert numbers to binary:**

```javascript
const binary = arr.map((x) => x.toString(2));
console.log(binary);  // ["1", "10", "11", "100", "101"]
```

**Transform an array of objects:**

```javascript
const users = [
    { first_name: "Alice", age: 28 },
    { first_name: "Bob",   age: 35 },
];

const names = users.map((user) => user.first_name);
console.log(names);  // ["Alice", "Bob"]
```

---

### How `map` Works Internally

```javascript
// Conceptual implementation of map
Array.prototype.myMap = function(logic) {
    const output = [];
    for (let i = 0; i < this.length; i++) {
        output.push(logic(this[i]));
    }
    return output;
};
```

---

### `map` at a Glance

| Feature                  | Detail                                           |
|--------------------------|--------------------------------------------------|
| **Returns**              | A new array of the **same length**               |
| **Modifies original?**   | ❌ No — always returns a new array               |
| **Callback receives**    | `(element, index, array)`                        |
| **Use when**             | You want to transform every element in an array  |

---

## 2. `filter()` — Selecting Specific Elements

### Purpose

`filter()` is used to create a **new array containing only the elements that satisfy a specific condition**. Elements that fail the condition are discarded.

```
Input array:   [1, 2, 3, 4, 5, 6]
                ↓  ✗  ↓  ✗  ↓  ✗   (keep if: x % 2 !== 0)
Output array:  [1,    3,    5   ]
```

> If no elements pass the condition, `filter` returns an **empty array** — never throws an error.

---

### Syntax

```javascript
const output = arr.filter((element) => condition);
```

The callback is a **predicate** — it must return `true` (keep) or `false` (discard).

---

### Examples

**Filter odd numbers:**

```javascript
const arr = [1, 2, 3, 4, 5, 6];
const odds = arr.filter((x) => x % 2 !== 0);
console.log(odds);  // [1, 3, 5]
```

**Filter even numbers:**

```javascript
const evens = arr.filter((x) => x % 2 === 0);
console.log(evens);  // [2, 4, 6]
```

**Filter numbers greater than 4:**

```javascript
const output = arr.filter((x) => x > 4);
console.log(output);  // [5, 6]
```

**Filter objects by property:**

```javascript
const users = [
    { first_name: "Alice", age: 28 },
    { first_name: "Bob",   age: 35 },
    { first_name: "Carol", age: 24 },
];

const under30 = users.filter((user) => user.age < 30);
console.log(under30);
// [{ first_name: "Alice", age: 28 }, { first_name: "Carol", age: 24 }]
```

---

### How `filter` Works Internally

```javascript
// Conceptual implementation of filter
Array.prototype.myFilter = function(logic) {
    const output = [];
    for (let i = 0; i < this.length; i++) {
        if (logic(this[i])) {
            output.push(this[i]);
        }
    }
    return output;
};
```

---

### `filter` at a Glance

| Feature                  | Detail                                                   |
|--------------------------|----------------------------------------------------------|
| **Returns**              | A new array — **same or shorter** length than original   |
| **Modifies original?**   | ❌ No — always returns a new array                       |
| **Callback receives**    | `(element, index, array)` — must return `true` or `false`|
| **Use when**             | You want to select elements matching a condition         |

---

## 3. `reduce()` — Deriving a Single Value

### Purpose

`reduce()` is used when you need to **iterate over an array and boil it down to a single value** — a number, string, object, or any other data structure.

```
Input array:  [1, 2, 3, 4, 5]
               ↓
reduce(sum):  ((((1+2)+3)+4)+5) = 15
               ↓
Output:       15  (a single value)
```

---

### Syntax

```javascript
const output = arr.reduce((accumulator, current) => {
    // update accumulator using current
    return updatedAccumulator;
}, initialValue);
```

**Parameters:**

| Parameter       | Role                                                              |
|-----------------|-------------------------------------------------------------------|
| `accumulator`   | Stores the ongoing/running result — updated on every iteration   |
| `current`       | The current element being processed in this iteration            |
| `initialValue`  | The starting value of the accumulator (second argument to `reduce`) |

---

### Examples

**Sum of all elements:**

```javascript
const arr = [1, 2, 3, 4, 5];

const sum = arr.reduce((acc, curr) => acc + curr, 0);
console.log(sum);  // 15
```

Step-by-step:
```
Initial:  acc = 0
Step 1:   acc = 0 + 1 = 1
Step 2:   acc = 1 + 2 = 3
Step 3:   acc = 3 + 3 = 6
Step 4:   acc = 6 + 4 = 10
Step 5:   acc = 10 + 5 = 15
Result:   15
```

---

**Find the maximum value:**

```javascript
const max = arr.reduce((acc, curr) => {
    return curr > acc ? curr : acc;
}, 0);
console.log(max);  // 5
```

---

**Build an object from an array (advanced):**

```javascript
const users = [
    { first_name: "Alice", age: 28 },
    { first_name: "Bob",   age: 35 },
    { first_name: "Carol", age: 24 },
];

// Group users by age range
const ageReport = users.reduce((acc, curr) => {
    if (curr.age < 30) {
        acc.under30.push(curr.first_name);
    } else {
        acc.over30.push(curr.first_name);
    }
    return acc;
}, { under30: [], over30: [] });

console.log(ageReport);
// { under30: ["Alice", "Carol"], over30: ["Bob"] }
```

---

### How `reduce` Works Internally

```javascript
// Conceptual implementation of reduce
Array.prototype.myReduce = function(logic, initialValue) {
    let acc = initialValue;
    for (let i = 0; i < this.length; i++) {
        acc = logic(acc, this[i]);
    }
    return acc;
};
```

---

### `reduce` at a Glance

| Feature                  | Detail                                                        |
|--------------------------|---------------------------------------------------------------|
| **Returns**              | A **single value** — number, string, object, array, etc.      |
| **Modifies original?**   | ❌ No                                                         |
| **Callback receives**    | `(accumulator, currentElement, index, array)`                 |
| **Second argument**      | The initial value of the accumulator                          |
| **Use when**             | You need to compute a single result from an entire array      |

---

## 4. Chaining Methods

One of the most powerful features of these functions is the ability to **chain them together** — the output of one becomes the input of the next.

---

### Example — First Names of Users Under Age 30

```javascript
const users = [
    { first_name: "Alice", age: 28 },
    { first_name: "Bob",   age: 35 },
    { first_name: "Carol", age: 24 },
    { first_name: "Dave",  age: 31 },
];

const output = users
    .filter((user) => user.age < 30)   // Step 1: Keep users under 30
    .map((user) => user.first_name);    // Step 2: Extract first names

console.log(output);  // ["Alice", "Carol"]
```

---

### Chaining Flow

```
users (original array of objects)
        ↓
.filter(age < 30)
        → [Alice (28), Carol (24)]
        ↓
.map(user => first_name)
        → ["Alice", "Carol"]
```

---

### Why Chaining Works

Each of these methods returns a new array — which means you can immediately call another array method on the result. This enables clean, readable pipelines:

```javascript
// ❌ Without chaining — verbose and less readable
const filtered = users.filter((u) => u.age < 30);
const names    = filtered.map((u) => u.first_name);

// ✅ With chaining — concise and expressive
const names = users
    .filter((u) => u.age < 30)
    .map((u) => u.first_name);
```

---

### Chaining `filter`, `map`, and `reduce` Together

```javascript
// Sum the ages of all users under 30
const totalAge = users
    .filter((u) => u.age < 30)          // Keep under-30s
    .map((u) => u.age)                  // Extract their ages
    .reduce((acc, age) => acc + age, 0); // Sum the ages

console.log(totalAge);  // 52 (28 + 24)
```

---

## 5. Summary & Key Takeaways

### Function Summary Table

| Function    | Purpose                              | Returns                                  | Callback Returns       |
|-------------|--------------------------------------|------------------------------------------|------------------------|
| `map()`     | Transform every element              | New array — **same length**              | The transformed element |
| `filter()`  | Select elements matching a condition | New array — **same or shorter length**   | `true` or `false`      |
| `reduce()`  | Combine elements into one value      | A **single value** (any type)            | Updated accumulator    |

---

### When to Use Which

```
Need a new array with every element transformed?  →  map()
Need a new array with only some elements?         →  filter()
Need a single value derived from the array?       →  reduce()
Need multiple operations combined?                →  chain them
```

---

### `for` Loop vs. Functional Approach

```javascript
const arr = [1, 2, 3, 4, 5];

// ❌ for loop — imperative, verbose
const result = [];
for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 !== 0) {
        result.push(arr[i] * 2);
    }
}

// ✅ functional — declarative, readable
const result = arr
    .filter((x) => x % 2 !== 0)
    .map((x) => x * 2);
```

---

### Core Rules

| Rule                                              | Explanation                                                        |
|---------------------------------------------------|--------------------------------------------------------------------|
| `map` preserves array length                      | Always returns same number of elements as input                    |
| `filter` may shorten the array                    | Only keeps elements where callback returns `true`                  |
| `reduce` collapses the array                      | Always returns a single value — set the initial accumulator wisely |
| None modify the original array                    | All three are non-destructive — they return new data               |
| Chain for multi-step transformations              | Output of each method is a new array ready for the next operation  |

---

## Technology Stack

| Component    | Detail                                                              |
|--------------|---------------------------------------------------------------------|
| **Language** | JavaScript                                                          |
| **Concept**  | `map`, `filter`, `reduce`, Method Chaining, Functional Programming  |
| **Purpose**  | Expressive, clean array manipulation using Higher-Order Functions   |

---

*For further reading, refer to [MDN on `map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), [MDN on `filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), and [MDN on `reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).*
