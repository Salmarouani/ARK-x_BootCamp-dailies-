const summarizeAge = (users) =>
  users
    .filter(({ gender }) => gender === 'male')
    .reduce((total, { age }) => total + age, 0);

module.exports = summarizeAge;
