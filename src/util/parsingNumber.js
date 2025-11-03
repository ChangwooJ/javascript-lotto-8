export function parsingNumbers(winningNumberArray) {
  const numbersArray = winningNumberArray
    .split(',')
    .map((number) => Number(number.trim()));

  return numbersArray;
}
