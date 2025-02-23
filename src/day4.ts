import { arraySum } from "./lib";

const part1CountDirectionConfig = [
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

export function solveDay4Part1(input: string): number {
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
  const countsInAllDirections = part1CountDirectionConfig.map((config) => {
    return {
      name: config.name,
      count: countWordsInDirection(
        formattedInput,
        "XMAS",
        config.verticalMoveInterval,
        config.horizontalMoveInterval
      ),
    };
  });

  // SUM
  const summableCounts = countsInAllDirections.map((count) => count.count);
  const totalSum = arraySum(summableCounts);
  return totalSum;
}

export function solveDay4Part2(input: string): number {
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
  const count = countXMas(formattedInput);
  return count;
}

function formatInput(input: string) {
  return input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => !!line);
}

function countWordsInDirection(
  input: string[],
  wordToMatch: string,
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

function countXMas(input: string[]) {
  let count = 0;
  const linesToLetters = input.map((line) => {
    return line.split("");
  });
  for (let lineIndex = 0; lineIndex < linesToLetters.length - 1; lineIndex++) {
    // if this is the first line continue
    if (lineIndex === 0) continue;

    // If this is the last line, break
    if (lineIndex === linesToLetters.length - 1) break;

    // Set this lines letters
    const thisLineLetters = linesToLetters[lineIndex];

    // For every line letter, check if it's an "A"
    for (
      let letterIndex = 0;
      letterIndex < thisLineLetters.length - 1;
      letterIndex++
    ) {
      // if this is the first letter in the line, continue
      if (letterIndex === 0) continue;

      // if this is the last letter in the line, break
      if (letterIndex === thisLineLetters.length) break;

      // if this letter is not an "A", continue
      const thisLetter = thisLineLetters[letterIndex];
      if (thisLetter !== "A") continue;

      // Get and Set Letters at each position
      // Starting top left and moving clockwise
      const position1Letter = linesToLetters[lineIndex - 1][letterIndex - 1];
      const position2Letter = linesToLetters[lineIndex - 1][letterIndex + 1];
      const position3Letter = linesToLetters[lineIndex + 1][letterIndex + 1];
      const position4Letter = linesToLetters[lineIndex + 1][letterIndex - 1];

      // Validate all Letters are the correct letter (M or S)
      const lettersAreValid = [
        position1Letter,
        position2Letter,
        position3Letter,
        position4Letter,
      ].every((letter) => ["M", "S"].includes(letter));
      if (!lettersAreValid) continue;

      // Validate that each opposite letter is not the same letter
      const wordOneIsValid = position1Letter !== position3Letter;
      if (!wordOneIsValid) continue;
      const wordTwoIsValid = position2Letter !== position4Letter;
      if (!wordTwoIsValid) continue;

      // If we reached here we have a match
      count++;
    }
  }
  return count;
}
