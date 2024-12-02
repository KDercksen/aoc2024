import fs from "fs";

const data = fs
  .readFileSync("./data.txt", "utf8")
  .split("\n")
  .map((line) => line.split(" ").map(Number));

const isSafe = (numbers) => {
  // Helper function to check if array is valid without removing any numbers
  const isValid = (arr) => {
    const decreasing = arr[0] > arr[1];
    for (let i = 0; i < arr.length - 1; i++) {
      if (decreasing && arr[i] <= arr[i + 1]) return false;
      if (!decreasing && arr[i] >= arr[i + 1]) return false;
      const diff = Math.abs(arr[i] - arr[i + 1]);
      if (diff < 1 || diff > 3) return false;
    }
    return true;
  };

  // Check original array
  if (isValid(numbers)) return true;

  // Try removing each number
  for (let i = 0; i < numbers.length; i++) {
    const withoutNumber = [...numbers.slice(0, i), ...numbers.slice(i + 1)];
    if (isValid(withoutNumber)) return true;
  }

  return false;
};

console.log(data.filter(isSafe).length);