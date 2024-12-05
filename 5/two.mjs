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

const incorrectPages = pages.filter((page) => !checkPage(page, ordering));

// implement a bubble sort function to order the pages
const bubbleSort = (page, ordering) => {
  let tmpPage = [...page];
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < tmpPage.length - 1; i++) {
      // If current number doesn't have next number in its ordering, swap them
      if (!ordering[tmpPage[i]]?.includes(tmpPage[i + 1])) {
        const temp = tmpPage[i];
        tmpPage[i] = tmpPage[i + 1];
        tmpPage[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
  return tmpPage;
};

const sortedPages = incorrectPages.map((page) => bubbleSort(page, ordering));

console.log(
  sortedPages
    .map((page) => page[Math.floor(page.length / 2)])
    .reduce((acc, num) => acc + num, 0)
);
