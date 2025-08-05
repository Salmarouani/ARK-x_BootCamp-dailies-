function mostOccurred(arr) {
  const frequency = {};
  let most = arr[0];
  let maxCount = 0;

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    frequency[num] = frequency[num] ? frequency[num] + 1 : 1;

    if (frequency[num] > maxCount) {
      most = num;
      maxCount = frequency[num];
    }
  }

  return most;
}

console.log(mostOccurred([4, 2, 2, 7, 2])); // ➞ 2
