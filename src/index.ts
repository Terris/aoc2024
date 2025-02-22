import { readFileSync } from "fs";
import { join } from "path";
import { solveDay2 } from "./day2";

const readInput = (day: number): string => {
  const inputPath = join(__dirname, "..", "inputs", `day${day}.txt`);
  return readFileSync(inputPath, "utf8");
};

// const input = readInput(1);
// console.log(`Day 1 solution:`, solveDay1(input));

const input = readInput(2);
console.log(`Day 2 solution:`, solveDay2(input)); // => [402, ?]
