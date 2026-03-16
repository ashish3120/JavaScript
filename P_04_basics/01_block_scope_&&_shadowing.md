# JavaScript Block Scope & Shadowing – Complete Guide

> Block scope and shadowing are fundamental to understanding how `let`, `const`, and `var` behave inside nested code structures. Mastering these concepts prevents accidental variable overwrites and scope-related bugs.

---

## Table of Contents

1. [What is a Block?](#1-what-is-a-block)
2. [Block Scope](#2-block-scope)
3. [Shadowing](#3-shadowing)
4. [Illegal Shadowing](#4-illegal-shadowing)
5. [Lexical Block Scope](#5-lexical-block-scope)
6. [Key Takeaways](#6-key-takeaways)

---

## 1. What is a Block?

A **block** is a pair of curly braces `{ }` that groups multiple JavaScript statements together. It is also called a **compound statement**.

```javascript
{
    // This is a block
    let x = 10;
    console.log(x);
}
```

### Why Blocks Exist

JavaScript sometimes expects a **single statement** — for example, after an `if` condition or a `for` loop header. A block allows you to provide **multiple statements** in that single-statement slot:

```javascript
// if expects one statement — block lets us provide many
if (true) {
    let a = 1;       // statement 1
    let b = 2;       // statement 2
    console.log(a + b); // statement 3
}
```

| Context              | Without Block           | With Block `{ }`                        |
|----------------------|-------------------------|-----------------------------------------|
| `if` condition       | Only one statement      | Multiple statements grouped together    |
| `for` / `while` loop | Only one statement      | Multiple statements grouped together    |
| Standalone           | Not useful              | Creates an isolated scope for `let`/`const` |

---

## 2. Block Scope

**Block scope** defines which variables are accessible within a specific block — and critically, which are not accessible outside it.

---

### `let` and `const` — Block Scoped ✅

`let` and `const` variables are stored in a **separate memory space** created specifically for their block. They are inaccessible once the block's execution ends.

```javascript
{
    let a = 10;
    const b = 20;
    var c = 30;

    console.log(a);  // ✅ 10 — inside the block
    console.log(b);  // ✅ 20 — inside the block
    console.log(c);  // ✅ 30 — inside the block
}

console.log(a);  // ❌ ReferenceError: a is not defined
console.log(b);  // ❌ ReferenceError: b is not defined
console.log(c);  // ✅ 30 — var leaks out of the block
```

---

### `var` — NOT Block Scoped ❌

`var` ignores block boundaries. It is **function-scoped** (or global if declared outside any function). Declaring `var` inside a block does not confine it to that block.

```javascript
function example() {
    if (true) {
        var x = 100;   // var declared inside a block
    }
    console.log(x);    // ✅ 100 — var leaked out of the if block
}
```

---

### Memory Spaces During Block Execution

When a block executes, the JavaScript engine creates a dedicated memory space for `let` and `const`:

```
Executing block { }:

  Block Memory (temporary):      Global / Script Memory:
  ┌──────────┬──────────┐        ┌──────────┬──────────┐
  │    a     │   10     │        │    c     │   30     │  ← var on window
  │    b     │   20     │        └──────────┴──────────┘
  └──────────┴──────────┘
       ↑ deleted when block ends
```

---

### Block Scope Comparison

| Keyword   | Block Scoped? | Where Stored          | Accessible After Block? |
|-----------|---------------|-----------------------|-------------------------|
| `let`     | ✅ Yes        | Block memory space    | ❌ No — memory deleted  |
| `const`   | ✅ Yes        | Block memory space    | ❌ No — memory deleted  |
| `var`     | ❌ No         | Global / function scope | ✅ Yes — leaks out     |

---

## 3. Shadowing

**Shadowing** occurs when a variable declared in an inner scope has the **same name** as a variable in an outer scope. The inner variable temporarily "shadows" (hides) the outer one within its scope.

---

### `var` Shadowing `var`

When `var` shadows another `var` inside a block, they are **the same variable** — because `var` is not block-scoped and both point to the same global memory. The inner assignment **overwrites** the outer value.

```javascript
var x = 1;          // Global x

{
    var x = 10;     // Same variable — overwrites global x
    console.log(x); // 10
}

console.log(x);     // 10 — global x was modified ⚠️
```

```
Memory:
  x → 1     (before block)
  x → 10    (inside block — same memory location overwritten)
  x → 10    (after block — original value GONE)
```

---

### `let` / `const` Shadowing `let` / `const`

When `let` or `const` shadows an outer `let`/`const`, the inner variable exists in a **completely separate block-scoped memory**. The outer variable is untouched.

```javascript
let a = 100;          // Outer a — in Script memory

{
    let a = 200;      // Inner a — in Block memory (separate)
    console.log(a);   // 200 — inner a
}

console.log(a);       // 100 — outer a completely unchanged ✅
```

```
Script Memory:          Block Memory (temporary):
┌──────┬──────┐         ┌──────┬──────┐
│  a   │ 100  │         │  a   │ 200  │  ← separate, isolated
└──────┴──────┘         └──────┴──────┘
   ↑ original unchanged      ↑ deleted when block ends
```

---

### Shadowing Behaviour Comparison

| Scenario                       | Same Memory? | Outer Variable Modified? |
|--------------------------------|--------------|--------------------------|
| `var` shadows `var`            | ✅ Yes       | ✅ Yes — overwrites       |
| `let` shadows `let`            | ❌ No        | ❌ No — fully isolated    |
| `const` shadows `const`        | ❌ No        | ❌ No — fully isolated    |
| `let` shadows `var`            | ❌ No        | ❌ No — valid shadowing   |

---

## 4. Illegal Shadowing

Not all shadowing combinations are permitted. **Illegal shadowing** occurs when you attempt to shadow a `let` variable using `var` within the same scope.

```javascript
let a = 10;

{
    var a = 20;  // ❌ SyntaxError: Identifier 'a' has already been declared
}
```

### Why is This Illegal?

`var` is function-scoped, not block-scoped. When you declare `var a` inside a block, it attempts to **hoist itself to the enclosing function or global scope** — where `let a` already exists. This effectively becomes a re-declaration of `a` in the same scope, which `let` does not allow.

```
Block scope attempt:
  var a → hoists to global/function scope
  let a → already declared there
  Result → SyntaxError: re-declaration conflict
```

---

### What IS Allowed

```javascript
// ✅ Shadowing var with let — valid
var b = 10;

{
    let b = 20;   // ✅ Fine — let creates a new block-scoped b
    console.log(b); // 20
}

console.log(b);   // 10 — var b unchanged
```

---

### Illegal Shadowing — Quick Rules

| Combination                    | Legal?              | Reason                                            |
|--------------------------------|---------------------|---------------------------------------------------|
| `var` shadows `var`            | ✅ Legal            | Both function/global scoped — same memory         |
| `let` shadows `let`            | ✅ Legal            | Inner `let` is block-scoped — separate memory     |
| `const` shadows `const`        | ✅ Legal            | Inner `const` is block-scoped — separate memory   |
| `let` shadows `var`            | ✅ Legal            | `let` creates new block-scoped variable           |
| `var` shadows `let`            | ❌ **Illegal**      | `var` hoists to scope where `let` already exists  |
| `var` shadows `const`          | ❌ **Illegal**      | Same reason — `var` hoists into conflict          |

---

## 5. Lexical Block Scope

Blocks follow the same **lexical scoping rules** as functions. An inner block can access variables from its parent block, forming a scope chain.

```javascript
const outer = "I am outer";

{
    const middle = "I am middle";

    {
        const inner = "I am inner";

        console.log(inner);   // ✅ Found in current block
        console.log(middle);  // ✅ Found in parent block
        console.log(outer);   // ✅ Found in grandparent (global) scope
    }

    console.log(inner);       // ❌ ReferenceError — inner block already ended
}
```

### Scope Chain for Blocks

```
Innermost Block
    │  inner = "I am inner"
    └─ parent ref → Middle Block
                        │  middle = "I am middle"
                        └─ parent ref → Global Scope
                                            │  outer = "I am outer"
                                            └─ parent ref → null
```

> The scope chain for blocks works identically to functions — the engine climbs **upward** through parent scopes until the variable is found or `null` is reached.

---

## 6. Key Takeaways

> **Understanding block scope is crucial for using `let` and `const` effectively and avoiding the accidental variable modifications that are common with `var`.**

---

### Core Rules Summary

| Rule                                                | Explanation                                                        |
|-----------------------------------------------------|--------------------------------------------------------------------|
| `{ }` creates a block                               | Groups statements and creates a scope for `let`/`const`            |
| `let`/`const` are block-scoped                      | Confined to the block — deleted from memory when block ends        |
| `var` is NOT block-scoped                           | Leaks out of blocks — attached to function or global scope         |
| `var` shadowing `var`                               | Same variable — outer value is overwritten                         |
| `let`/`const` shadowing `let`/`const`               | Separate memory — outer variable is fully protected                |
| `var` shadowing `let`/`const`                       | ❌ Illegal — `SyntaxError` due to scope boundary conflict           |
| Inner blocks access outer block variables           | Scope chain climbs upward through parent blocks                    |

---

### Complete Scope Behaviour at a Glance

```javascript
var v = "var-global";
let l = "let-outer";

{
    var v = "var-block";    // ⚠️  Same as global v — overwrites it
    let l = "let-block";    // ✅  Separate — outer l unchanged
    let x = "block-only";   // ✅  Only exists inside this block
}

console.log(v);  // "var-block"   — outer var was overwritten
console.log(l);  // "let-outer"   — outer let was protected
console.log(x);  // ❌ ReferenceError — x doesn't exist here
```

---

## Technology Stack

| Component    | Detail                                                          |
|--------------|-----------------------------------------------------------------|
| **Language** | JavaScript                                                      |
| **Concept**  | Block Scope, Shadowing, Illegal Shadowing, Lexical Block Scope  |
| **Purpose**  | Managing variable visibility and preventing accidental overwrites |

---

*For further reading, refer to [MDN Web Docs on Block Statements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block) and [Variable Scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope).*
