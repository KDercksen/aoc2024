import fs from "fs";

const data = fs
  .readFileSync("data.txt", "utf8")
  .split("\n")
  .map((line) => line.split(""));

// find the guard position (character "^")
const guardRow = data.findIndex((line) => line.includes("^"));
const guardCol = data[guardRow].findIndex((char) => char === "^");
const startPos = [guardRow, guardCol];
const direction = [-1, 0];

const turnRight = (direction) => {
  const [row, col] = direction;
  return [col, -row];
};

const peek = (pos, direction) => {
  return data[pos[0] + direction[0]][pos[1] + direction[1]];
};

const outOfBounds = (pos, direction) => {
  return (
    pos[0] + direction[0] < 0 ||
    pos[0] + direction[0] >= data.length ||
    pos[1] + direction[1] < 0 ||
    pos[1] + direction[1] >= data[0].length
  );
};

let currentPos = startPos;
let currentDirection = direction;
const visited = new Set();
do {
  const nextPos = peek(currentPos, currentDirection);
  if (nextPos === "#") {
    currentDirection = turnRight(currentDirection);
  } else {
    visited.add(currentPos.join(","));
    currentPos = [
      currentPos[0] + currentDirection[0],
      currentPos[1] + currentDirection[1],
    ];
  }
} while (!outOfBounds(currentPos, direction));
