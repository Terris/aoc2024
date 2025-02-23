import { arraySum, isEvenNumber } from "./lib";

export function solveDay5(input: string): [number, number] {
  const [updateRules, updates] = formatInput(input);

  const safetyManualUpdateOrderScoreReport =
    getSafetyManualUpdateOrderScoreReport(updateRules, updates);

  // PART 1
  const updateScoresThatAreInCorrectOrder =
    safetyManualUpdateOrderScoreReport.filter(
      (score) => score.updateIsInCorrectOrder
    );

  const updatesThatAreInCorrectOrder = updateScoresThatAreInCorrectOrder.map(
    (score) => updates[score.updateIndex]
  );

  const middlePagesOfCorrectUpdates = getMiddlePagesOfUpdates(
    updatesThatAreInCorrectOrder
  );

  // PART 2
  const updateScoresThatAreNotInCorrectOrder =
    safetyManualUpdateOrderScoreReport.filter(
      (score) => !score.updateIsInCorrectOrder
    );

  const updatesThatAreNotInCorrectOrder =
    updateScoresThatAreNotInCorrectOrder.map(
      (score) => updates[score.updateIndex]
    );

  const fixedUpdates = fixOrderOfUpdates(
    updateRules,
    updatesThatAreNotInCorrectOrder
  );

  const middlePagesOfFixedUpdates = getMiddlePagesOfUpdates(fixedUpdates);

  return [
    arraySum(middlePagesOfCorrectUpdates),
    arraySum(middlePagesOfFixedUpdates),
  ];
}

function formatInput(input: string): [number[][], number[][]] {
  const [updateRules, updates] = input
    .split("\n\n")
    .map((part) => part.trim().split("\n"));
  return [
    updateRules.map((ruleString) =>
      ruleString.split("|").map((rule) => Number(rule))
    ),
    updates.map((updateString) =>
      updateString.split(",").map((update) => Number(update))
    ),
  ];
}

function getMiddlePageOfUpdate(update: number[]): number {
  const indexOfMiddle = Math.ceil(update.length / 2) - 1;
  return update[indexOfMiddle];
}

function getMiddlePagesOfUpdates(updates: number[][]): number[] {
  return updates.map((update) => getMiddlePageOfUpdate(update));
}

function getRelatedRulesForPage(
  page: number,
  allUpdateRules: number[][]
): number[][] {
  return allUpdateRules.filter((rule) => rule.includes(page));
}

function getIsPageInCorrectOrderForRule(
  page: number,
  update: number[],
  rule: number[]
): boolean {
  const indexOfThisPageInUpdate = update.indexOf(page);
  // if this page === the first in the rule set
  // the second rule set page should always come after this page
  if (page === rule[0]) {
    return (
      update.indexOf(rule[1]) === -1 ||
      update.indexOf(rule[1]) > indexOfThisPageInUpdate
    );
  }
  // if this page === the second in the rule set
  // either the first rule should not be in the update
  // or the first rule set page should always come before this page
  if (page === rule[1]) {
    return (
      update.indexOf(rule[0]) === -1 ||
      update.indexOf(rule[0]) < indexOfThisPageInUpdate
    );
  }
  // if neither are true, there is an error in the input
  throw new Error("This page not found in the provided rule");
}

function getUpdatePagesAreInCorrectOrderScore(
  update: number[],
  allUpdateRules: number[][]
): boolean[] {
  return update.map((page) => {
    const relatedRules = getRelatedRulesForPage(page, allUpdateRules);
    const pageCorrectOrderScore = relatedRules.map((thisRule) =>
      getIsPageInCorrectOrderForRule(page, update, thisRule)
    );
    const pageIsInCorrectOrder = pageCorrectOrderScore.every((score) => score);
    return pageIsInCorrectOrder;
  });
}

function getUpdatePagesAreInCorrectOrder(
  update: number[],
  allUpdateRules: number[][]
) {
  return getUpdatePagesAreInCorrectOrderScore(update, allUpdateRules).every(
    (page) => page
  );
}

function getSafetyManualUpdateOrderScoreReport(
  allUpdateRules: number[][],
  updates: number[][]
) {
  return updates.map((update, updateIndex) => {
    const updateIsInCorrectOrder = getUpdatePagesAreInCorrectOrder(
      update,
      allUpdateRules
    );
    return { updateIndex, updateIsInCorrectOrder };
  });
}

function getRulesApplicableToUpdate(
  update: number[],
  allUpdateRules: number[][],
  unique?: boolean
) {
  const updateRules = update
    .map((page) => getRelatedRulesForPage(page, allUpdateRules))
    .flat();
  if (unique)
    return updateRules.reduce((acc, curr) => {
      const hasRule = acc.find((r) => r[0] == curr[0] && r[1] === curr[1]);
      if (hasRule) return acc;
      return [...acc, curr];
    }, [] as number[][]);
  return updateRules;
}

function fixOrderOfUpdates(allUpdateRules: number[][], updates: number[][]) {
  return updates.map((update) => {
    const applicableUpdateRules = getRulesApplicableToUpdate(
      update,
      allUpdateRules,
      true
    );
    const sortedUpdate = recursivelySortUpdateByRules(
      update,
      applicableUpdateRules
    );
    return sortedUpdate;
  });
}

function recursivelySortUpdateByRules(
  update: number[],
  updateRules: number[][]
) {
  const brokenApplicableRules = updateRules.filter(
    (rule) => !getIsPageInCorrectOrderForRule(rule[0], update, rule)
  );
  if (brokenApplicableRules.length === 0) return update;
  const ruleToFixInThisIteration = brokenApplicableRules[0];
  const sortedUpdate = moveArrayItemAtIndexToNewIndex(
    update.indexOf(ruleToFixInThisIteration[0]),
    update.indexOf(ruleToFixInThisIteration[1]),
    update
  );
  return recursivelySortUpdateByRules(sortedUpdate, updateRules);
}

function moveArrayItemAtIndexToNewIndex(
  oldItemIndex: number,
  newItemIndex: number,
  fullArray: number[]
) {
  const itemAtOldIndex = fullArray[oldItemIndex];
  return fullArray.reduce((acc, currentItem, currentIndex) => {
    if (currentIndex === oldItemIndex) return acc;
    if (currentIndex === newItemIndex)
      return [...acc, itemAtOldIndex, currentItem];
    return [...acc, currentItem];
  }, [] as number[]);
}
