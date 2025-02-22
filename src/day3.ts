import { arraySum, isEvenNumber } from "./lib";

export function solveDay3(input: string): [number, number] {
  const formattedInputPart1 = formatInputWithoutInstructions(input);
  const part1Solution = multiplyAndSumPairs(formattedInputPart1);
  const formattedInputPart2 = formatInputWithInstruction(input);
  const part2Solution = multiplyAndSumPairs(formattedInputPart2);
  return [part1Solution, part2Solution];
}

function multiplyAndSumPairs(pairs: number[][]) {
  const multipliedPairs = pairs.map((item) => item[0] * item[1]);
  const summedPairs = arraySum(multipliedPairs);
  return summedPairs;
}

const multiplierRegexp = /mul\(+(\d{1,3},\d{1,3}\))/g; // mul(12,321)

function formatInputWithInstruction(input: string) {
  // => xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))
  const firstValidString = input.substring(0, input.indexOf("don't()"));
  let doStrings: string[] = [firstValidString];
  let remainingInput: string = input.slice(input.indexOf("don't()"));

  while (remainingInput.length > 0) {
    const hasRemainingDoCommands = remainingInput.includes("do()");
    if (hasRemainingDoCommands) {
      const nextDoCommandToEnd = remainingInput.slice(
        remainingInput.indexOf("do()")
      );
      const hasRemainingDontCommands = nextDoCommandToEnd.includes("don't()");
      if (hasRemainingDontCommands) {
        const nextDontCommandIndex = nextDoCommandToEnd.indexOf("don't()");
        doStrings.push(nextDoCommandToEnd.slice(0, nextDontCommandIndex));
        remainingInput = nextDoCommandToEnd.slice(nextDontCommandIndex);
      } else {
        doStrings.push(nextDoCommandToEnd);
        remainingInput = "";
      }
    } else {
      remainingInput = "";
    }
  }
  return formatInputWithoutInstructions(doStrings.join(","));
}

function formatInputWithoutInstructions(input: string) {
  // => xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
  return [...input.matchAll(multiplierRegexp)] // =>['mul(2,4)', index: 1, input: 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))' ,groups: undefined]
    .map((item) => item[0]) // => [ 'mul(2,4)', 'mul(5,5)', 'mul(11,8)', 'mul(8,5)' ]
    .map((item) => {
      const toIndex = item.indexOf(")");
      return item.slice(4, toIndex);
    }) // => [ '2,4', '5,5', '11,8', '8,5' ]
    .map((item) => item.split(",").map((st) => Number(st))); // => [ [ 2, 4 ], [ 5, 5 ], [ 11, 8 ], [ 8, 5 ] ]
}
