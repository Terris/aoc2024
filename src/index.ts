import { readFileSync } from "fs";
import { join } from "path";

import { solveDay1 } from "./day1";

const readInput = (day: number): string => {
  const inputPath = join(__dirname, "..", "inputs", `day${day}.txt`);
  return readFileSync(inputPath, "utf8");
};

const input = readInput(1);
console.log(`Day 1 solution:`, solveDay1(input));
