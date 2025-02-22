import { arraySum } from "./lib";

const multiplierRegexp = /mul\(+(\d{1,3},\d{1,3}\))/g;
export const solveDay3 = (input: string): [number, number] => {
  const formattedInput = formatInput(input);
  const multipliedPairs = formattedInput.map((item) => item[0] * item[1]);
  const summedPairs = arraySum(multipliedPairs);
  return [summedPairs, 0];
};

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
