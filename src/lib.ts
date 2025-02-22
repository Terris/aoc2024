// NUMBERS
// ==================================================

/**
 * Returns true if given number is even : false
 * isEvenNumber(2) => true
 * isEvenNumber(3) => false
 * isEvenNumber(0) => true
 */
export function isEvenNumber(number: number): boolean {
  return number % 2 === 0;
}

// ARRAYS
// ==================================================

/**
 * Returns a sum of all numbers in a given array
 * arraySum([1,2,3]) => 6
 */
export function arraySum(arr: number[]): number {
  return arr.reduce((acc, curr) => acc + curr, 0);
}

/**
 * Given an array, return a new array of arrays of n length
 * chunkArray([1,2,3,4,5,6], 3) => [[1,2,3], [4,5,6]]
 */
export function chunkArray(array: any[], size: number) {
  const chunkedArray = [];
  let index = 0;

  while (index < array.length) {
    chunkedArray.push(array.slice(index, index + size));
    index += size;
  }

  return chunkedArray;
}
