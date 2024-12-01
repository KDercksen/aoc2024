import fs from "fs";

const data = fs
  .readFileSync("./data.txt", "utf8")
  .split("\n")
  .map((line) => line.split(/\s+/).map(Number));

const a = data.map(([a]) => a).sort();
const b = data.map(([, b]) => b).sort();
// get the counts of each unique value in b
const bCounts = b.reduce((acc, curr) => {
  acc[curr] = (acc[curr] || 0) + 1;
  return acc;
}, {});

// multiple each item in a with the count of the corresponding item in b
const values = a.map((a) => a * (bCounts[a] || 0));

// print the sum of the values
console.log(values.reduce((a, b) => a + b, 0));
