const processUserData = require('./processUserData');
const summarizeAge = require('./summarizeAge');

const fetchUserData = async () => {
  try {
    const response = await fetch('https://dummyjson.com/users');
    const data = await response.json();
    const users = data.users;

    const processedUsers = processUserData(users);
    const totalAge = summarizeAge(users);

    console.log("Processed Users:");
    processedUsers.forEach(user => console.log(`- ${user}`));
    console.log(`\nTotal Age of Male Users: ${totalAge}`);

  } catch (error) {
    console.error("Failed to fetch user data:", error.message);
  }
};

module.exports = fetchUserData;
