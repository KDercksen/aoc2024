import fs from "fs";

const data = fs
  .readFileSync("./data.txt", "utf8")
  .split("\n")
  .map((line) => line.split(""));
console.log(data);

const findXMAS = (data) => {
  const rows = data.length;
  const cols = data[0].length;
  let count = 0;

  // Check each starting position
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Check all 8 directions from this position
      count += checkDirection(data, row, col, 0, 1); // right
      count += checkDirection(data, row, col, 0, -1); // left
      count += checkDirection(data, row, col, 1, 0); // down
      count += checkDirection(data, row, col, -1, 0); // up
      count += checkDirection(data, row, col, 1, 1); // down-right
      count += checkDirection(data, row, col, 1, -1); // down-left
      count += checkDirection(data, row, col, -1, 1); // up-right
      count += checkDirection(data, row, col, -1, -1); // up-left
    }
  }

  return count;
};

const checkDirection = (data, row, col, rowDir, colDir) => {
  const word = "XMAS";
  const rows = data.length;
  const cols = data[0].length;

  // Check if word would extend beyond boundaries
  if (
    row + rowDir * 3 >= rows ||
    row + rowDir * 3 < 0 ||
    col + colDir * 3 >= cols ||
    col + colDir * 3 < 0
  ) {
    return 0;
  }

  // Check if characters match XMAS
  for (let i = 0; i < word.length; i++) {
    if (data[row + rowDir * i][col + colDir * i] !== word[i]) {
      return 0;
    }
  }

  return 1;
};

const result = findXMAS(data);
console.log(result);
