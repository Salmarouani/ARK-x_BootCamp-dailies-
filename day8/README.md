# 📘 Day 8: TypeScript Introduction

Welcome to TypeScript! This guide gives a crisp overview of what TypeScript is, why developers are flocking to it, and how it contrasts with JavaScript.

---

## 🚀 What is TypeScript?

TypeScript is a **superset of JavaScript** that adds _optional static typing_ and modern development features. It compiles down to JavaScript, meaning anything you can do in JS, you can do in TS—with extras.

---

## 🔍 TypeScript vs JavaScript

| Feature               | TypeScript                                  | JavaScript                     |
|-----------------------|----------------------------------------------|--------------------------------|
| ✅ Static Typing       | Yes — helps catch bugs at compile time       | No — all typing is dynamic     |
| 🛠 Compilation         | Must be compiled to JavaScript               | Interpreted directly           |
| 🔤 Type Inference      | Built-in support for auto-detecting types    | Not available                  |
| 🧰 Tooling Support     | Superb editor integration & autocomplete     | Decent, but less rich          |
| 🧪 Error Checking      | Compile-time errors                          | Mostly runtime errors          |

---

## 🧑‍💻 TS vs JS Code Example

**TypeScript**

```ts
function greet(name: string): string {
  return `Hello, ${name}`;
}


npm install typescript --save-dev
npx tsc --init


npx tsc
