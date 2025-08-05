📘 JavaScript Loops & Functions: All You Need to Know
🔁 Loops in JavaScript
Loops let you execute a block of code repeatedly.

🔹 for Loop
✅ Syntax:
js
Copy code
for (initialization; condition; increment) {
  // code to run
}
🧰 Use Case:
When you know exactly how many times you want to loop.

Perfect for iterating through arrays or counting up/down.

🧪 Example:
js
Copy code
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
⚠️ Special Cases:
You can omit any part (but don’t omit the semicolons!):

js
Copy code
let i = 0;
for (; i < 3;) {
  console.log(i++);
}
🔹 while Loop
✅ Syntax:
js
Copy code
while (condition) {
  // code to run
}
🧰 Use Case:
When the number of iterations is unknown.

Loop continues as long as the condition is true.

🧪 Example:
js
Copy code
let i = 0;
while (i < 5) {
  console.log(i); // 0, 1, 2, 3, 4
  i++;
}
⚠️ Special Cases:
Risk of infinite loop if condition never becomes false:

js
Copy code
while (true) {
  // Avoid this unless intentionally infinite
}
🔹 do...while Loop
✅ Syntax:
js
Copy code
do {
  // code to run
} while (condition);
🧰 Use Case:
When you want to execute the loop body at least once, even if the condition is false.

🧪 Example:
js
Copy code
let i = 0;
do {
  console.log(i); // 0 (even if i >= 5)
  i++;
} while (i < 1);
⚠️ Special Cases:
Useful for input validation where one execution is mandatory.

🧠 JavaScript Functions
Functions are reusable blocks of code used to perform specific tasks.

🔹 Declaring a Function
✅ Syntax:
js
Copy code
function functionName(parameters) {
  // code
}
📞 Calling a Function:
js
Copy code
functionName(arguments);
🧪 Example:
js
Copy code
function greet(name) {
  console.log(`Hello, ${name}`);
}
greet("Alice"); // Hello, Alice
🔹 Types of Functions
1. Function Declaration (hoisted)
js
Copy code
function add(a, b) {
  return a + b;
}
2. Function Expression (not hoisted)
js
Copy code
const add = function(a, b) {
  return a + b;
};
3. Arrow Function (ES6)
js
Copy code
const add = (a, b) => a + b;
4. Anonymous Function
Used in places where you don’t need a named function.

js
Copy code
setTimeout(function() {
  console.log("Hello");
}, 1000);
5. Immediately Invoked Function Expression (IIFE)
js
Copy code
(function() {
  console.log("Runs immediately!");
})();
🔒 JavaScript Scope
🔹 What is Scope?
Scope determines where variables and functions can be accessed in your code.

🔸 Types of Scope
Global Scope
Declared outside any function or block — accessible everywhere.

Function Scope
Variables declared with var, let, or const inside a function are not accessible outside.

Block Scope (with let and const)

js
Copy code
if (true) {
  let x = 10; // only inside this block
}
Lexical Scope
Functions can access variables defined in their outer scopes.

js
Copy code
function outer() {
  let msg = "Hello";
  function inner() {
    console.log(msg); // has access to outer scope
  }
  inner();
}
⚠️ Special Function Cases
🔹 Hoisting
Function declarations are hoisted (you can call them before they’re defined).

Function expressions and arrow functions are not.

🔹 Default Parameters
js
Copy code
function greet(name = "Guest") {
  console.log(`Hello, ${name}`);
}
🔹 Rest Parameters
js
Copy code
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
🔹 Callback Functions
A function passed as an argument to another function.

js
Copy code
function runCallback(callback) {
  callback();
}

runCallback(() => console.log("Callback executed"));
✅ Summary Table
Concept	Description	Example
for	Known loop count	for (i = 0; i < n; i++) {}
while	Loop until condition is false	while (x < 10) {}
do...while	Executes at least once	do { } while (x < 10);
function	Reusable block of code	function greet() {}
=>	Arrow function (short syntax)	const greet = () => {}
Scope	Visibility of variables/functions	Global, Function, Block

![Alt text](https://tse2.mm.bing.net/th/id/OIP.D502cj8eBR1UHUzT1g2s_QAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3)