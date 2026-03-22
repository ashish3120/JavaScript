<div align="center">

# 📚 JavaScript Notes & Reference Guide

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=28&pause=1000&color=F7DF1E&center=true&vCenter=true&width=600&lines=Master+JavaScript;From+Basics+to+Advanced;Complete+Reference+Guide;Code+Examples+%26+Concepts" alt="Typing SVG" />

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](CONTRIBUTING.md)

**A comprehensive collection of JavaScript concepts, code snippets, and best practices — from fundamentals to advanced topics.**

[📖 Documentation](#documentation) • [🚀 Quick Start](#quick-start) • [📂 Contents](#table-of-contents) • [💡 Examples](#examples) • [🤝 Contribute](#contributing)

</div>

---


## 🎯 What's Inside

- ✅ Comprehensive JavaScript fundamentals to advanced concepts
- ✅ Working code examples in `.js` files
- ✅ Detailed explanations in `.md` files
- ✅ ES6+ modern syntax and features
- ✅ Structured learning path

---

## 📖 Table of Contents

### 🟢 [01_basics](01_basics/) - JavaScript Fundamentals

| File | Topic |
|------|-------|
| [01_variables.js](01_basics/01_variables.js) | `let`, `const`, `var` - Variable declarations |
| [02_datatypes.js](01_basics/02_datatypes.js) | Primitive & reference data types |
| [03_ConversionOperation.js](01_basics/03_ConversionOperation.js) | Type conversion & operations |
| [04_comparision.js](01_basics/04_comparision.js) | Comparison operators & equality |
| [05_strings.js](01_basics/05_strings.js) | String methods & manipulation |
| [06_nums_and_math.js](01_basics/06_nums_and_math.js) | Numbers & Math object |
| [07_datesIn_JS.js](01_basics/07_datesIn_JS.js) | Date object & time operations |
| [datatypes-summary.js](01_basics/datatypes-summary.js) | Data types summary |
| [test.js](01_basics/test.js) | Practice & testing |

### 🔵 [02_basics](02_basics/) - Data Structures

| File | Topic |
|------|-------|
| [01_arrays.js](02_basics/01_arrays.js) | Array basics & methods |
| [02_arrays.js](02_basics/02_arrays.js) | Advanced array operations |
| [03_objects.js](02_basics/03_objects.js) | Object literals & properties |
| [04_objects.js](02_basics/04_objects.js) | Advanced object concepts |

### 🟣 [P_03_basics](P_03_basics/) - JavaScript Internals

| File | Topic |
|------|-------|
| [code_execution.md](P_03_basics/code_execution.md) | How JavaScript code executes |
| [hoisting_in_js.md](P_03_basics/hoisting_in_js.md) | Hoisting explained |
| [how_JS_Works.md](P_03_basics/how_JS_Works.md) | JavaScript engine internals |
| [let_const.md](P_03_basics/let_const.md) | `let` vs `const` deep dive |
| [scope_lexical_Env.md](P_03_basics/scope_lexical_Env.md) | Scope & lexical environment |
| [shortest_JS_file.md](P_03_basics/shortest_JS_file.md) | Minimal JS program explained |
| [undefined_notdefined.md](P_03_basics/undefined_notdefined.md) | `undefined` vs `not defined` |

### 🟡 [P_04_basics](P_04_basics/) - Advanced Functions & Concepts

| File | Topic |
|------|-------|
| [010_map_filter_reduce.md](P_04_basics/010_map_filter_reduce.md) | Array methods: map, filter, reduce |
| [01_block_scope_&&_shadowing.md](P_04_basics/01_block_scope_&&_shadowing.md) | Block scope & shadowing |
| [02_closures.md](P_04_basics/02_closures.md) | Closures explained |
| [04_first_Class_function.md](P_04_basics/04_first_Class_function.md) | First-class functions |
| [05_callback_function.md](P_04_basics/05_callback_function.md) | Callback functions |
| [06_asynchronus.md](P_04_basics/06_asynchronus.md) | Asynchronous JavaScript |
| [07_JS_Engine.md](P_04_basics/07_JS_Engine.md) | JavaScript engine architecture |
| [08_Set_timeout.md](P_04_basics/08_Set_timeout.md) | setTimeout & timers |
| [09_higher_order_function.md](P_04_basics/09_higher_order_function.md) | Higher-order functions |
| [set_timeout-&_&_closure_interview.md](P_04_basics/set_timeout-&_&_closure_interview.md) | Interview questions |

---

## 💡 Quick Code Reference

### Variables & Data Types
```javascript
// Modern variable declarations
let name = "Ashish";      // Block-scoped, reassignable
const PI = 3.14159;       // Block-scoped, constant
var age = 25;             // Function-scoped (avoid)

// Data types
typeof "hello"    // "string"
typeof 42         // "number"
typeof true       // "boolean"
typeof undefined  // "undefined"
typeof null       // "object" (known quirk)
```

### Strings
```javascript
const str = "JavaScript";

// String methods
str.length;                    // 10
str.toUpperCase();             // "JAVASCRIPT"
str.toLowerCase();             // "javascript"
str.charAt(0);                 // "J"
str.slice(0, 4);              // "Java"
str.indexOf("Script");         // 4
str.includes("Script");        // true

// Template literals
const greeting = `Hello, ${name}!`;
```

### Arrays
```javascript
const numbers = [1, 2, 3, 4, 5];

// Map - transform elements
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

// Filter - select elements
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// Reduce - accumulate
const sum = numbers.reduce((acc, n) => acc + n, 0);
// 15

// Other useful methods
numbers.push(6);              // Add to end
numbers.pop();                // Remove from end
numbers.shift();              // Remove from start
numbers.unshift(0);           // Add to start
```

### Objects
```javascript
// Object creation
const user = {
  name: "Ashish",
  age: 25,
  city: "India",
  greet() {
    return `Hello, ${this.name}!`;
  }
};

// Accessing properties
user.name;           // "Ashish"
user["age"];         // 25

// Object methods
Object.keys(user);   // ["name", "age", "city", "greet"]
Object.values(user); // ["Ashish", 25, "India", function]
Object.entries(user);// [["name", "Ashish"], ...]

// Destructuring
const { name, age } = user;

// Spread operator
const updatedUser = { ...user, country: "IN" };
```

### Functions
```javascript
// Function declaration
function greet(name) {
  return `Hello, ${name}!`;
}

// Function expression
const greet = function(name) {
  return `Hello, ${name}!`;
};

// Arrow function
const greet = (name) => `Hello, ${name}!`;

// Callback function
setTimeout(() => {
  console.log("Executed after 1 second");
}, 1000);

// Higher-order function
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);
```

### Closures
```javascript
function createCounter() {
  let count = 0;
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.getCount();  // 2
```

### Asynchronous JavaScript
```javascript
// Promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: "Success" });
    }, 1000);
  });
};

// Async/Await
async function getData() {
  try {
    const result = await fetchData();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
```

---

## 📂 Repository Structure

```
javascript-notes/
│
├── 01_basics/                    # Fundamentals
│   ├── 01_variables.js
│   ├── 02_datatypes.js
│   ├── 03_ConversionOperation.js
│   ├── 04_comparision.js
│   ├── 05_strings.js
│   ├── 06_nums_and_math.js
│   ├── 07_datesIn_JS.js
│   ├── datatypes-summary.js
│   └── test.js
│
├── 02_basics/                    # Data Structures
│   ├── 01_arrays.js
│   ├── 02_arrays.js
│   ├── 03_objects.js
│   └── 04_objects.js
│
├── P_03_basics/                  # JavaScript Internals
│   ├── code_execution.md
│   ├── hoisting_in_js.md
│   ├── how_JS_Works.md
│   ├── let_const.md
│   ├── scope_lexical_Env.md
│   ├── shortest_JS_file.md
│   └── undefined_notdefined.md
│
├── P_04_basics/                  # Advanced Concepts
│   ├── 010_map_filter_reduce.md
│   ├── 01_block_scope_&&_shadowing.md
│   ├── 02_closures.md
│   ├── 04_first_Class_function.md
│   ├── 05_callback_function.md
│   ├── 06_asynchronus.md
│   ├── 07_JS_Engine.md
│   ├── 08_Set_timeout.md
│   ├── 09_higher_order_function.md
│   └── set_timeout-&_&_closure_interview.md
│
└── README.md
```

---

## 🚀 How to Use

### 1. Clone the Repository
```bash
git clone https://github.com/ashish3120/javascript-notes.git
cd javascript-notes
```

### 2. Navigate & Learn
```bash
# Start with basics
cd 01_basics

# Open any file and study
code 01_variables.js
```

### 3. Run the Code

**In Browser Console:**
```javascript
// Press F12 → Console tab
// Copy-paste code from any .js file
```

**In Node.js:**
```bash
node 01_basics/01_variables.js
```

**In VS Code:**
```
Install Code Runner extension
Right-click → Run Code
```

---

## 📚 Learning Path

**Recommended Study Order:**

```
Step 1: 01_basics (Fundamentals)
   ↓
   Learn: Variables, Data Types, Strings, Numbers, Dates
   
Step 2: 02_basics (Data Structures)
   ↓
   Master: Arrays & Objects
   
Step 3: P_03_basics (Internals)
   ↓
   Understand: Hoisting, Scope, Execution Context
   
Step 4: P_04_basics (Advanced)
   ↓
   Deep Dive: Closures, Callbacks, Async, Higher-Order Functions
```

---

## 🎯 Key Concepts Covered

### ✅ Core JavaScript
- Variables (`let`, `const`, `var`)
- Data Types (primitives, objects)
- Type Conversion & Coercion
- Operators & Comparisons
- Strings, Numbers, Dates

### ✅ Data Structures
- Arrays & Array Methods
- Objects & Object Manipulation
- Map, Filter, Reduce

### ✅ JavaScript Internals
- Execution Context
- Hoisting
- Scope & Lexical Environment
- How JavaScript Works

### ✅ Advanced Concepts
- Closures
- First-Class Functions
- Callbacks
- Higher-Order Functions
- Asynchronous JavaScript
- JavaScript Engine
- setTimeout & Timers

---

## 📖 Additional Resources

### Official Documentation
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Complete JS reference
- [JavaScript.info](https://javascript.info/) - Modern JavaScript tutorial
- [Eloquent JavaScript](https://eloquentjavascript.net/) - Free online book

### Video Tutorials
- [freeCodeCamp](https://www.freecodecamp.org/) - Free courses
- [JavaScript30](https://javascript30.com/) - 30 Day Challenge
- [Traversy Media](https://www.youtube.com/@TraversyMedia) - YouTube channel

### Practice Platforms
- [LeetCode](https://leetcode.com/) - Coding challenges
- [CodeWars](https://www.codewars.com/) - Practice problems
- [HackerRank](https://www.hackerrank.com/) - JavaScript track

---

## 🤝 Contributing

Contributions welcome! To contribute:

1. Fork the repository
2. Create a branch (`git checkout -b feature/new-topic`)
3. Add your notes/improvements
4. Commit changes (`git commit -m 'Add notes on XYZ'`)
5. Push to branch (`git push origin feature/new-topic`)
6. Open a Pull Request

**Guidelines:**
- Follow existing file naming conventions
- Add clear code comments
- Include practical examples
- Keep explanations beginner-friendly

---

## 📧 Contact

**Ashish Kumar Singh**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ashish-kumar-singh-71ab60289/)
[![Email](https://img.shields.io/badge/Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:ashishsingh66652@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/ashish3120)

---

## ⭐ Show Your Support

If these notes helped you:
- ⭐ Star this repository
- 🔀 Fork it for your reference
- 📢 Share with fellow learners

---

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

---

<div align="center">

**Happy Learning JavaScript! 🚀**

*Made with ❤️ by Ashish Kumar Singh*

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)

</div>
