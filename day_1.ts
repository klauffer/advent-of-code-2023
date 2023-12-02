import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { runPart } from "https://deno.land/x/aocd@v1.5.1/mod.ts";

const validNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

function parse(input: string): string[] {
  return input.trimEnd().split("\n");
}

function findNumbersInString(lineItem: string): number {
  const characters = [...lineItem];
  const numbers = characters.filter((character) =>
    validNumbers.includes(character)
  );
  const firstNumber = numbers[0];
  const lastNumber = numbers[numbers.length - 1];
  const totalAsString = `${firstNumber}${lastNumber}`;
  const total = parseInt(totalAsString, 10);
  return total;
}

function findTotalInStrings(lineItems: string[]): number {
  const lineNumber = lineItems.map(findNumbersInString);
  const total = lineNumber.reduce((acc, curr) => acc + curr, 0);
  return total;
}

function replaceNumberWordsWithNumbers(lineItem: string): string {
  const wordMappings: { [key: string]: string } = {
    "twone": "21",
    "eightwo": "82",
    "eighthree": "83",
    "oneight": "18",
    "fiveight": "58",
    "threeight": "38",
    "nine": "9",
    "eight": "8",
    "seven": "7",
    "six": "6",
    "five": "5",
    "four": "4",
    "three": "3",
    "two": "2",
    "one": "1",
  };

  const regularExpression = new RegExp(
    Object.keys(wordMappings).join("|"),
    "g",
  );

  const replacedString = lineItem.replace(
    regularExpression,
    (matched) => {
      return wordMappings[matched];
    },
  );
  return replacedString;
}

function part1(input: string): number {
  const lineItems = parse(input);
  return findTotalInStrings(lineItems);
}

function part2(input: string): number {
  const lineItems = parse(input);
  const itemsWithNumbers = lineItems.map(replaceNumberWordsWithNumbers);
  return findTotalInStrings(itemsWithNumbers);
}

if (import.meta.main) {
  runPart(2023, 1, 1, part1);
  runPart(2023, 1, 2, part2);
}

const TEST_INPUT_1 = `\
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`;

const TEST_INPUT_2 = `\
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
three9two5two135
nineeightjknsdxtx1fivefive3ccscvtp
one6xzxmmjpone7ngdlvvhljmhztlbsgxthree
213five5
leightwothreeninesixtsljvdl1nflg249
twone
eightwo
eighthree
oneight
fiveight
`;

// Deno.test("part1", () => {
//   assertEquals(part1(TEST_INPUT_1), 142);
// });

Deno.test("part2", () => {
  assertEquals(part2(TEST_INPUT_2), 798);
});

// 2023 Day 1 Part 1: 55834
// 2023 Day 1 Part 2: 53254
