function sockMerchant(socks) {
  const sockCount = {};
  for (const sock of socks) {
    sockCount[sock] = (sockCount[sock] || 0) + 1;
  }
  let pairs = 0;
  for (const count of Object.values(sockCount)) {
    pairs += Math.floor(count / 2);
  }
  return pairs;
}
