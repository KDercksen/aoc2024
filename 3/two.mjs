import fs from "fs";

const data = fs.readFileSync("./data.txt", "utf8").replaceAll("\n", "");
const pattern = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g;

let active = true;
let result = 0;
for (const match of data.matchAll(pattern)) {
  if (match[0] === "do()") active = true;
  else if (match[0] === "don't()") active = false;
  else if (active) result += Number(match[1]) * Number(match[2]);
}
console.log(result);

// const result = [...data.matchAll(pattern)]
//   .map((match) => Number(match[1]) * Number(match[2]))
//   .reduce((acc, curr) => acc + curr, 0);
