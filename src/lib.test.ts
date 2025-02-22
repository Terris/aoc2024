import { arraySum, chunkArray, extractSubstrings, isEvenNumber } from "./lib";

describe("isEvenNumber", () => {
  it("should return true given an even number", () => {
    expect(isEvenNumber(2)).toBe(true);
    expect(isEvenNumber(0)).toBe(true);
  });
  it("should return false given an odd number", () => {
    expect(isEvenNumber(3)).toBe(false);
  });
});

describe("arraySum", () => {
  it("should return a sum of all numbers in an array ", () => {
    expect(arraySum([1, 2, 3])).toBe(6);
  });
});

describe("chunkArray", () => {
  it("should return an array of arrays each of given length", () => {
    expect(chunkArray([1, 2, 3, 4, 5, 6], 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
  });
});

describe("extractSubstrings", () => {
  it("extracts all substrings between given markers", () => {
    const input = "foobobbazzlestart()foobarend()klzzikle";
    expect(extractSubstrings(input, "start()", "end()")).toEqual(["foobar"]);
  });

  it("extracts all substrings between given markers when there are multiple", () => {
    const input = "start()fooend()bobbazzlefoostart()barend()klzzikle";
    expect(extractSubstrings(input, "start()", "end()")).toEqual([
      "foo",
      "bar",
    ]);
  });

  it("extracts all substrings between given markers including the tails", () => {
    const input =
      "start()fooend()bo0982431)(*bbazzlefoostart()barend()klzziklestart()bazzle";
    expect(extractSubstrings(input, "start()", "end()", true)).toEqual([
      "foo",
      "bar",
      "bazzle",
    ]);
  });
});
