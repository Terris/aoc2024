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

/**
 * Returns
 * arraySum([1,2,3]) => 6
 */
export function arraySum(arr: number[]): number {
  return arr.reduce((acc, curr) => acc + curr, 0);
}
