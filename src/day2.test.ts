import { solveDay2 } from "./day2";

describe("Day 2", () => {
  it("should solve example input correctly", () => {
    const exampleInput = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
    `;
    expect(solveDay2(exampleInput)).toEqual([2, 4]);
  });
});
