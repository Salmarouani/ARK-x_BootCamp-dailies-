const processUserData = (users) =>
  users
    .filter(({ gender }) => gender !== 'male')
    .map(({ firstName, lastName, age }) => `Name: ${firstName} ${lastName}, Age: ${age}`);

module.exports = processUserData;
