type Report = number[];

const LEVEL_CHANGE_THRESHOLD = 4;

export function solveDay2(input: string): [number, number] {
  const reports: Report[] = formatInput(input); // => [[1, 2, 3], [4, 5, 6]]
  const { allSafeReports, dampenerCandidates } = safeReports(reports);
  return [
    allSafeReports.length,
    allSafeReports.length + dampenerCandidates.length,
  ];
}

// Private
function formatInput(input: string): Report[] {
  return input
    .split("\n") // Split the text at each line break => [" ", "1 2 3", "4 5 6", "    "]
    .map((item) => item.trim()) // Trim out whitespace => ["", "1 2 3", "4 5 6", ""]
    .filter((item) => !!item) // Remove empty items => ["1 2 3", "4 5 6"]
    .map((line) => line.split(" ").map((item) => parseInt(item))); // split each line's items into an array of numbers // => [[1,2,3], [4,5,6]]
}

function safeReports(reports: Report[]) {
  const allSafeReports = reports.filter((report) => isSafeReport(report));
  const allUnsafeReports = reports.filter((report) => !isSafeReport(report));
  const allDampenerCandidateReports = allUnsafeReports.filter((report) =>
    isSafeReportWithDampeners(report)
  );
  return { allSafeReports, dampenerCandidates: allDampenerCandidateReports };
}

function isSafeReport(report: Report): Boolean {
  const isAllIncreasing = report.every(
    (num, index) => index === report.length - 1 || num < report[index + 1]
  );

  const isAllDecreasing = report.every(
    (num, index) => index === report.length - 1 || num > report[index + 1]
  );

  const isAllSafeChange = report.every(
    (num, index) =>
      index === report.length - 1 || Math.abs(num - report[index + 1]) <= 3
  );

  return (isAllIncreasing || isAllDecreasing) && isAllSafeChange;
}

// for every item in report
// check if it is a safe report without item
function isSafeReportWithDampeners(report: Report) {
  const dampenerCandidate = report.find((num, index) => {
    const reportWithoutThisNum = [...report];
    reportWithoutThisNum.splice(index, 1);
    return isSafeReport(reportWithoutThisNum);
  });
  return Boolean(dampenerCandidate);
}
