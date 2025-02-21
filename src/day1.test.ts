import { solveDay1 } from "./day1";

describe("Day 1a", () => {
  it("should solve input correctly", () => {
    const input = `
    3   4
    4   3
    2   5
    1   3
    3   9
    3   3`;

    expect(solveDay1(input)).toStrictEqual([11, 31]);
  });
});
