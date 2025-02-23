import { solveDay4 } from "./day4";

describe("Day 4", () => {
  it("should solve example input correctly", () => {
    const exampleInput = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
    `;
    expect(solveDay4(exampleInput)).toBe(18);
  });
});
