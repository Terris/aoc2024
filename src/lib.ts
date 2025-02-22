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

// TEXT
// ==================================================

export function extractSubstrings(
  input: string,
  startMarker: string,
  endMarker: string,
  includeTail?: boolean
) {
  const startMarkerLength = startMarker.length;
  const endMarkerLength = endMarker.length;
  let substrings: string[] = [];

  let cursor = 0;

  while (true) {
    if (cursor > input.length - 1) break;

    // starting point
    const startIndex = input.indexOf(startMarker, cursor);
    if (startIndex === -1) break;

    // end point
    let endIndex = input.indexOf(endMarker, startIndex + startMarker.length);
    if (endIndex == -1) {
      if (!includeTail) break;
      endIndex = input.length;
    }

    //extract the sub string
    const substring = input.substring(startIndex + startMarkerLength, endIndex);
    substrings.push(substring);

    cursor = endIndex + endMarkerLength;
  }

  return substrings;
}
