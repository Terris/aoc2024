type GuardRouteMap = string[][];
type MapPosition = [number, number];
type GuardPostionChar = "^" | ">" | "v" | "<";
type Direction = "NORTH" | "EAST" | "SOUTH" | "WEST";

const OBSTACLE = "#";
const GUARD_POSITION_CHAR_KEY = ["^", ">", "v", "<"];
const DIRECTION_KEY = {
  "^": "NORTH",
  ">": "EAST",
  v: "SOUTH",
  "<": "WEST",
};

export function solveDay6(input: string): number {
  const guardRouteMap = formatInput(input);
  const startingPosition = findStartingPosition(guardRouteMap);
  const positionCount = walkRoute(guardRouteMap, startingPosition);
  console.log(positionCount);
  return positionCount;
}

function formatInput(input: string) {
  const preparedInput = input
    .trim()
    .split("\n")
    .map((line) => line.split(""));
  const firstLineLength = preparedInput[0].length;
  const isEveryLineEqual = preparedInput.every(
    (line) => firstLineLength === line.length
  );
  if (!isEveryLineEqual) throw new Error("Every line must be the same length");
  return preparedInput;
}

function findStartingPosition(guardRouteMap: string[][]): MapPosition {
  let startingPosition = [0, 0] as MapPosition;
  traverseRows: for (
    let rowIndex = 0;
    rowIndex < guardRouteMap.length;
    rowIndex++
  ) {
    for (
      let colIndex = 0;
      colIndex < guardRouteMap[rowIndex].length;
      colIndex++
    ) {
      if (GUARD_POSITION_CHAR_KEY.includes(guardRouteMap[rowIndex][colIndex])) {
        startingPosition = [rowIndex, colIndex];
        break traverseRows;
      }
    }
  }
  return startingPosition;
}

function getCharAtPosition(
  guardRouteMap: GuardRouteMap,
  position: MapPosition
) {
  if (isPositionOutOfBounds(guardRouteMap, position)) return "";
  return guardRouteMap[position[0]][position[1]];
}

function getGuardDirectionAtPosition(
  guardRouteMap: GuardRouteMap,
  position: MapPosition
): Direction {
  const positionChar = getCharAtPosition(
    guardRouteMap,
    position
  ) as GuardPostionChar;
  if (!GUARD_POSITION_CHAR_KEY.includes(positionChar))
    throw new Error("The character at that position is not a direction char.");
  return DIRECTION_KEY[positionChar] as Direction;
}

function getNextPosition(
  currentPosition: MapPosition,
  movementDirection: Direction
): MapPosition {
  const rowIncrementer =
    movementDirection === "NORTH" ? -1 : movementDirection === "SOUTH" ? 1 : 0;
  const colIncrementer =
    movementDirection === "WEST" ? -1 : movementDirection === "EAST" ? 1 : 0;
  return [
    currentPosition[0] + rowIncrementer,
    currentPosition[1] + colIncrementer,
  ];
}

function isPositionOutOfBounds(
  guardRouteMap: GuardRouteMap,
  position: MapPosition
): boolean {
  const topBoundry = 0;
  const rightBoundry = guardRouteMap[0].length - 1;
  const bottomBoundry = guardRouteMap.length - 1;
  const leftBoundry = 0;
  const rowPosition = position[0];
  const colPosition = position[1];
  if (
    rowPosition < topBoundry ||
    rowPosition > bottomBoundry ||
    colPosition < leftBoundry ||
    colPosition > rightBoundry
  ) {
    return true;
  }
  return false;
}

function isObstacleAtPosition(
  guardRouteMap: GuardRouteMap,
  position: MapPosition
): boolean {
  const charAtPosition = getCharAtPosition(guardRouteMap, position);
  return charAtPosition === OBSTACLE;
}

function isPositionDistinct(
  guardRouteMap: GuardRouteMap,
  previousDistinctPositions: MapPosition[],
  position: MapPosition
): boolean {
  if (isPositionOutOfBounds(guardRouteMap, position)) return false;
  return !Boolean(
    previousDistinctPositions.find(
      (prevPos) => prevPos[0] === position[0] && prevPos[1] === position[1]
    )
  );
}

function getDirectionAfterRightTurn(currentDirection: Direction): Direction {
  switch (currentDirection) {
    case "NORTH":
      return "EAST";
    case "EAST":
      return "SOUTH";
    case "SOUTH":
      return "WEST";
    case "WEST":
      return "NORTH";
    default: {
      throw new Error(
        `Current direction must be NORTH, EAST, SOUTH, or WEST. Received ${currentDirection}`
      );
    }
  }
}

function walkRoute(
  guardRouteMap: GuardRouteMap,
  startingPosition: MapPosition
) {
  let currentGuardPosition: MapPosition = startingPosition;
  let currentGuardDirection: Direction = getGuardDirectionAtPosition(
    guardRouteMap,
    startingPosition
  );
  let distinctPositionsVisited: MapPosition[] = [];
  let guardIsInBounds: boolean = true;

  while (guardIsInBounds) {
    if (
      isPositionDistinct(
        guardRouteMap,
        distinctPositionsVisited,
        currentGuardPosition
      )
    )
      distinctPositionsVisited.push(currentGuardPosition);
    const possibleNextPosition = getNextPosition(
      currentGuardPosition,
      currentGuardDirection
    );
    if (isObstacleAtPosition(guardRouteMap, possibleNextPosition)) {
      const prevGuardDir = currentGuardDirection;
      currentGuardDirection = getDirectionAfterRightTurn(prevGuardDir);
      continue;
    }
    if (isPositionOutOfBounds(guardRouteMap, possibleNextPosition)) {
      guardIsInBounds = false;
      break;
    }
    // All clear, move to next position
    currentGuardPosition = possibleNextPosition;
  }
  return distinctPositionsVisited.length;
}
