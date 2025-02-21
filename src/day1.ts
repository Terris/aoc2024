import { arraySum, isEvenNumber } from "./lib";

export const solveDay1 = (input: string): [number, number] => {
  // Replace line breaks with a single space
  const singleLineInput = input.replace(/(\r\n|\n|\r)/gm, " ");

  // Split the text into an array of strings and clean up any empties
  const splitText = singleLineInput.split(" ").filter((str) => !!str);

  // Convert the items into numbers
  const numberedItems = splitText.map((item) => parseInt(item));

  // Split the numbers into two lists
  // by extracting items at all even indexes
  const listA = numberedItems.reduce((acc, curr, index) => {
    if (isEvenNumber(index)) return [...acc, curr];
    return acc;
  }, [] as number[]);

  // and by extracting items at all odd indexes
  const listB = numberedItems.reduce((acc, curr, index) => {
    if (!isEvenNumber(index)) return [...acc, curr];
    return acc;
  }, [] as number[]);

  // Day 1 Part 1
  const totalDistance = getTotalDistance(listA, listB);

  // Day 2 Part 2

  const similarityScore = getSimilarityScore(listA, listB);

  return [totalDistance, similarityScore];
};

function getTotalDistance(listA: number[], listB: number[]) {
  // Sort the lists from smallest to biggest
  const sortedListA = listA.toSorted((a, b) => a - b);
  const sortedListB = listB.toSorted((a, b) => a - b);

  // Build an array of pair arrays
  const pairs = sortedListA.map((item, index) => [
    item, // could also do sortedListA[index]
    sortedListB[index],
  ]);

  // Build an array of distances between each pair
  const pairDistances = pairs.map((pair) => {
    // Sort so that the first number is larger than the second
    const sortedPair = pair.sort((a, b) => b - a);
    // return the difference between the two
    return sortedPair[0] - sortedPair[1];
  });

  // Sum the distances
  return arraySum(pairDistances);
}

function getSimilarityScore(listA: number[], listB: number[]) {
  // For each item in A
  // count the occurances of the same item in B
  // and multiply item by occurance count
  const scores = listA.reduce((acc, curr) => {
    const itemInListCount = listB.filter((item) => item === curr).length;
    const score = curr * itemInListCount;
    return [...acc, score];
  }, [] as number[]);

  return arraySum(scores);
}
