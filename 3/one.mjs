import fs from "fs";

const data = fs.readFileSync("./data.txt", "utf8").replaceAll("\n", "");
const pattern = /mul\((\d{1,3}),(\d{1,3})\)/g;

const result = [...data.matchAll(pattern)]
  .map((match) => Number(match[1]) * Number(match[2]))
  .reduce((acc, curr) => acc + curr, 0);
console.log(result);
