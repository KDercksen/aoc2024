import fs from "fs";

const data = fs
  .readFileSync("./data.txt", "utf8")
  .split("\n")
  .map((line) => line.split(""));

const findXMAS = (data) => {
  const rows = data.length;
  const cols = data[0].length;
  let count = 0;

  // Check each starting position
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (data[row][col] === "A") {
        count += checkXMAS(data, row, col);
      }
    }
  }

  return count;
};

const checkXMAS = (data, row, col) => {
  const word = "MAS";
  const rows = data.length;
  const cols = data[0].length;

  // Check if word would extend beyond boundaries
  if (row + 1 >= rows || row - 1 < 0 || col + 1 >= cols || col - 1 < 0) {
    return 0;
  }

  const upLbottomR =
    data[row - 1][col - 1] + data[row][col] + data[row + 1][col + 1];
  const upRbottomL =
    data[row - 1][col + 1] + data[row][col] + data[row + 1][col - 1];

  if (
    (upLbottomR === word || [...upLbottomR].reverse().join("") === word) &&
    (upRbottomL === word || [...upRbottomL].reverse().join("") === word)
  ) {
    return 1;
  }

  return 0;
};

const result = findXMAS(data);
console.log(result);
