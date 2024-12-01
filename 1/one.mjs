import fs from "fs";

const data = fs
  .readFileSync("./data.txt", "utf8")
  .split("\n")
  .map((line) => line.split(/\s+/).map(Number));

const aSorted = data.map(([a]) => a).sort();
const bSorted = data.map(([, b]) => b).sort();
// zip the two arrays and get the difference of the values
const diff = aSorted.map((a, i) => Math.abs(a - bSorted[i]));

console.log(diff.reduce((a, b) => a + b, 0));
