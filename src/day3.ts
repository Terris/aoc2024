import { arraySum, extractSubstrings, isEvenNumber } from "./lib";

export function solveDay3(input: string): [number, number] {
  // PART 1
  const formattedInputPart1 = formatInput(input);
  const part1Solution = multiplyAndSumPairs(formattedInputPart1);

  // PART 2
  const startingInstructions = input.substring(0, input.indexOf("don't"));
  const extractedEnabledInstructions = extractSubstrings(
    input,
    "do()",
    "don't()",
    true
  );
  const formattedInputPart2 = formatInput(
    [startingInstructions, ...extractedEnabledInstructions].join()
  );
  const part2Solution = multiplyAndSumPairs(formattedInputPart2);

  // RESULTS
  return [part1Solution, part2Solution];
}

function multiplyAndSumPairs(pairs: number[][]) {
  const multipliedPairs = pairs.map((item) => item[0] * item[1]);
  const summedPairs = arraySum(multipliedPairs);
  return summedPairs;
}

const multiplierRegexp = /mul\(+(\d{1,3},\d{1,3}\))/g; // mul(12,321)
function formatInput(input: string) {
  // => xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
  return [...input.matchAll(multiplierRegexp)] // =>['mul(2,4)', index: 1, input: 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))' ,groups: undefined]
    .map((item) => item[0]) // => [ 'mul(2,4)', 'mul(5,5)', 'mul(11,8)', 'mul(8,5)' ]
    .map((item) => {
      const toIndex = item.indexOf(")");
      return item.slice(4, toIndex);
    }) // => [ '2,4', '5,5', '11,8', '8,5' ]
    .map((item) => item.split(",").map((st) => Number(st))); // => [ [ 2, 4 ], [ 5, 5 ], [ 11, 8 ], [ 8, 5 ] ]
}
