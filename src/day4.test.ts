import { solveDay4Part1, solveDay4Part2 } from "./day4";

describe("Day 4 part 1", () => {
  it("should solve part 1 example input correctly", () => {
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
    expect(solveDay4Part1(exampleInput)).toBe(18);
  });
});

describe("Day 4 part 1", () => {
  it("should solve part 1 example input correctly", () => {
    const exampleInput = `
.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........
    `;
    expect(solveDay4Part2(exampleInput)).toBe(9);
  });
});
