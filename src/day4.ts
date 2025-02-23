import { arraySum } from "./lib";

const wordToMatch = "XMAS";

const countDirectionConfig = [
  {
    name: "Left",
    verticalMoveInterval: 0,
    horizontalMoveInterval: -1,
  },
  {
    name: "Right",
    verticalMoveInterval: 0,
    horizontalMoveInterval: 1,
  },
  {
    name: "Up",
    verticalMoveInterval: -1,
    horizontalMoveInterval: 0,
  },
  {
    name: "Up Left",
    verticalMoveInterval: -1,
    horizontalMoveInterval: -1,
  },
  {
    name: "Up Right",
    verticalMoveInterval: -1,
    horizontalMoveInterval: 1,
  },
  {
    name: "Down",
    verticalMoveInterval: 1,
    horizontalMoveInterval: 0,
  },
  {
    name: "Down Left",
    verticalMoveInterval: 1,
    horizontalMoveInterval: -1,
  },
  {
    name: "Down Right",
    verticalMoveInterval: 1,
    horizontalMoveInterval: 1,
  },
];

export function solveDay4(input: string): number {
  // FORMAT
  const formattedInput = formatInput(input);

  // VALIDATE
  const lineLength = formattedInput[0].length;
  const isEqualLineLengths = formattedInput.every(
    (line) => line.length === lineLength
  );
  if (!isEqualLineLengths)
    throw new Error("Lines must be equal lengths to count properly.");

  // COUNT WORDS
  const countsInAllDirections = countDirectionConfig.map((config) => {
    return {
      name: config.name,
      count: countWordsInDirection(
        formattedInput,
        config.verticalMoveInterval,
        config.horizontalMoveInterval
      ),
    };
  });
  // SUM
  const summableCounts = countsInAllDirections.map((count) => count.count);
  const totalSum = arraySum(summableCounts);
  console.log("TOTAL: ", totalSum);
  return totalSum;
}

function formatInput(input: string) {
  return input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => !!line);
}

function countWordsInDirection(
  input: string[],
  verticalMoveInterval: number,
  horizontalMoveInterval: number
) {
  const letterMatchSchema = wordToMatch.split("");
  const linesToLetters = input.map((line) => {
    return line.split("");
  });
  const lineCounts = linesToLetters.map((line, lineIndex) => {
    let lineCount = 0;
    for (
      let thisLetterIndex = 0;
      thisLetterIndex < line.length;
      thisLetterIndex++
    ) {
      // Down and Left Bounds
      if (
        (verticalMoveInterval < 0 && lineIndex < wordToMatch.length - 1) ||
        (horizontalMoveInterval < 0 && thisLetterIndex < wordToMatch.length - 1)
      ) {
        continue;
      }
      // Up and Right bounds
      if (
        (verticalMoveInterval > 0 &&
          lineIndex > linesToLetters.length - wordToMatch.length) ||
        (horizontalMoveInterval > 0 &&
          thisLetterIndex > line.length - wordToMatch.length)
      ) {
        break;
      }

      // Check that each letter matches from this point to the next
      // in the direction of the moveIntervals
      const hasMatch = letterMatchSchema.every((_, matchIndex) => {
        const thisLetter =
          linesToLetters[lineIndex + verticalMoveInterval * matchIndex][
            thisLetterIndex + horizontalMoveInterval * matchIndex
          ];
        return thisLetter === letterMatchSchema[matchIndex];
      });

      if (hasMatch) lineCount++;
    }
    return lineCount;
  });
  return arraySum(lineCounts);
}
