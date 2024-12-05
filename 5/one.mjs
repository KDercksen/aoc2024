import fs from "fs";

let [ordering, pages] = fs.readFileSync("./data.txt", "utf8").split("\n\n");
ordering = ordering.split("\n").reduce((acc, line) => {
  const [before, after] = line.split("|").map(Number);
  // Add after to [before] list, otherwise make new list with after
  acc[before] = acc[before] || [];
  acc[before].push(after);
  return acc;
}, {});
pages = pages.split("\n").map((line) => line.split(",").map(Number));

const checkPage = (page, ordering) => {
  for (let i = 0; i < page.length; i++) {
    const [current, ...rest] = page.slice(i);
    if (!rest.every((num) => ordering[current].includes(num))) {
      return false;
    }
  }
  return true;
};

const validPages = pages.filter((page) => checkPage(page, ordering));
const middleNumbers = validPages.map((page) => {
  const middleIndex = Math.floor(page.length / 2);
  return page[middleIndex];
});

const sum = middleNumbers.reduce((acc, num) => acc + num, 0);
console.log(sum);
