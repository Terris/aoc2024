import { readFileSync } from "fs";
import { join } from "path";
import { solveDay6 } from "./day6";

const readInput = (day: number): string => {
  const inputPath = join(__dirname, "..", "inputs", `day${day}.txt`);
  return readFileSync(inputPath, "utf8");
};

// const input = readInput(1);
// console.log(`Day 1 solution:`, solveDay1(input));

// const input = readInput(2);
// console.log(`Day 2 solution:`, solveDay2(input));

// const input = readInput(3);
// console.log(`Day 3 solution:`, solveDay3(input));

// const input = readInput(4);
// console.log(`Day 4 Part 1 solution:`, solveDay4Part1(input));
// console.log(`Day 4 Part 2 solution:`, solveDay4Part2(input));

// const input = readInput(5);
// console.log(`Day 5 solution:`, solveDay5(input));

const input = readInput(6);
console.log(`Day 6 solution:`, solveDay6(input));
