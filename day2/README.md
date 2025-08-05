# 📘 Day 2 – JavaScript Variables, Data Types & Conditional Statements

Today in the MERN Fullstack Bootcamp at **ARK-x Talent Factory**, we explored the fundamentals of JavaScript — variables, data types, operators, and conditional logic — and applied them in several hands-on coding challenges.

---

## 🔤 Variables in JavaScript

### ✅ Why Use Variables?
Variables store and represent values so we can reuse and manipulate them throughout our programs.

### 🧠 Declaring Variables

| Keyword | Scope        | Reassignable | Re-declarable | Best Use                    |
|---------|--------------|--------------|----------------|-----------------------------|
| `var`   | Function      | ✅           | ✅             | Old  code, avoid in modern |
| `let`   | Block         | ✅           | ❌             | For values that may change   |
| `const` | Block         | ❌           | ❌             | For constants, fixed values  |

### ⚠️ Variable Naming Rules
- Can contain: letters, digits, `_`, `$`
- Cannot start with a number
- **CamelCase** is recommended (`favoriteQuote`)
- Be meaningful and readable

---

## 🧱 JavaScript Data Types

### 🔠 Strings
```
let str1 = "Double quotes";
let str2 = 'Single quotes';
let str3 = `Backticks support ${variables}`;

Use backticks (`) for template literals:


Copier le code
let name = "Salma";
console.log(`Hello, ${name}!`);
🔢 Numbers

Copier le code
let x = 10 + 5;
let y = x * 2;
✅ Booleans

Copier le code
true
false
🕳️ Null & Undefined

Copier le code
let a = null;     // intentional absence
let b;            // undefined by default
➕ Operators in JavaScript
Arithmetic Operators: +, -, *, /, %
Comparison Operators: ==, ===, !=, !==, >, <, >=, <=
Logical Operators: &&, ||, !
Unary Operators: ++, --, typeof

❓ Conditional Statements
if, else, else if

Copier le code
if (score > 85) {
  grade = "A";
} else if (score > 70) {
  grade = "B";
} else {
  grade = "C";
}
switch

Copier le code
switch(day) {
  case 1: console.log("Monday"); break;
  case 2: console.log("Tuesday"); break;
  case 3: console.log("Wednesday"); break;
  case 4: console.log("Thursday"); break;
  case 5: console.log("Friday"); break;
  case 6: console.log("Saturday"); break;
  case 7: console.log("Sunday"); break;
  default: console.log("Unvalid Day");
}
Ternary Operator

Copier le code
let message = (score > 50) ? "Passed" : "Failed";
💡 Truthy & Falsy in JavaScript
Falsy Values:
false

0

"" (empty string)

null

undefined

NaN

Everything else is considered truthy.