# Day 7 – User Data Processing with ES6

This challenge fetches user data from an external API, processes it using modern JavaScript features (arrow functions, destructuring, array methods), and outputs key insights.

## Tasks

- Fetch user data from [DummyJSON Users API](https://dummyjson.com/users)
- Filter non-male users
- Map processed output into `"Name: [name], Age: [age]"`
- Summarize total age of male users

## How to Run

```bash
node index.js



---

### ✅ `index.js`

```js
const fetchUserData = require('./userData/fetchUserData');

(async () => {
  await fetchUserData();
})();
