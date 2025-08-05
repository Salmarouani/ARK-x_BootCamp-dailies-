// Import the main function that fetches, processes, and logs user data
const fetchUserData = require('./userData/fetchUserData');

// Run it asynchronously
(async () => {
  await fetchUserData();
})();
