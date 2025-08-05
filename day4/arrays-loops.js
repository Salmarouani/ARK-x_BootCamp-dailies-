function sum(numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

function countEven(numbers) {
  return numbers.filter(num => num % 2 === 0).length;
}

function double(numbers) {
  return numbers.map(num => num * 2);
}
