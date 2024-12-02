import fs from "fs";

const data = fs
  .readFileSync("./data.txt", "utf8")
  .split("\n")
  .map((line) => line.split(" ").map(Number));

const isSafe = (numbers) => {
  // the numbers are either increasing or decreasing, and any two adjacent numbers differ by at least one and at most three
  const decreasing = numbers[0] > numbers[1];
  for (let i = 0; i < numbers.length - 1; i++) {
    if (decreasing && numbers[i] <= numbers[i + 1]) return false;
    if (!decreasing && numbers[i] >= numbers[i + 1]) return false;
    const diff = Math.abs(numbers[i] - numbers[i + 1]);
    if (diff < 1 || diff > 3) return false;
  }
  return true;
};

console.log(data.filter(isSafe).length);