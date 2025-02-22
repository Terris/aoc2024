import { solveDay3 } from "./day3";

describe("Day 3", () => {
  it("should solve example input correctly", () => {
    const exampleInput = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
    expect(solveDay3(exampleInput)).toEqual([161, 48]);
  });
});
