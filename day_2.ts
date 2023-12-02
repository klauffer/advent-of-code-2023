import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { runPart } from "https://deno.land/x/aocd@v1.5.1/mod.ts";
interface GameResult {
  id: number;
  handfulOfCubes: HandfulOfCubes[];
}

interface HandfulOfCubes {
  redCount: number;
  greenCount: number;
  blueCount: number;
}

function parse(input: string): GameResult[] {
  const lineItem = input.trimEnd().split("\n");
  const gameResults = lineItem.map((lineItem) => {
    const gameResult: GameResult = {
      id: 0,
      handfulOfCubes: [],
    };
    const game = lineItem.split(":");
    const gameNumber = game[0].split(" ");
    const gameID = gameNumber[1];
    gameResult.id = parseInt(gameID, 10);
    const handfulOfCubesRawData = game[1].split(";");

    const handfulOfCubes = handfulOfCubesRawData.map(
      (handfulOfCubesRawData) => {
        const colorAndCountRawData = handfulOfCubesRawData.split(",").map((x) =>
          x.trim()
        );
        let redCount = 0;
        let greenCount = 0;
        let blueCount = 0;
        colorAndCountRawData.forEach((colorAndCountRawData) => {
          const colorAndCount = colorAndCountRawData.split(" ");
          const color = colorAndCount[1];
          const count = parseInt(colorAndCount[0], 10);
          if (color === "red") {
            redCount = count;
          } else if (color === "green") {
            greenCount = count;
          } else if (color === "blue") {
            blueCount = count;
          }
        });
        const handfulOfCubes: HandfulOfCubes = {
          redCount: redCount,
          greenCount: greenCount,
          blueCount: blueCount,
        };
        return handfulOfCubes;
      },
    );
    gameResult.handfulOfCubes = handfulOfCubes;
    return gameResult;
  });
  return gameResults;
}

function areAllHandfulOfCubesBelowMaxRedAllowed(
  gameResult: GameResult,
  maximumRedAllowed: number,
): boolean {
  const allHandfulOfCubesAreBelowMaxRedAllowed = gameResult.handfulOfCubes
    .every((handful) => {
      return handful.redCount <= maximumRedAllowed;
    });
  return allHandfulOfCubesAreBelowMaxRedAllowed;
}

function areAllHandfulOfCubesBelowMaxBlueAllowed(
  gameResult: GameResult,
  maximumBlueAllowed: number,
): boolean {
  const allHandfulOfCubesAreBelowMaxBlueAllowed = gameResult.handfulOfCubes
    .every((handful) => {
      return handful.blueCount <= maximumBlueAllowed;
    });
  return allHandfulOfCubesAreBelowMaxBlueAllowed;
}

function areAllHandfulOfCubesBelowMaxGreenAllowed(
  gameResult: GameResult,
  maximumGreenAllowed: number,
): boolean {
  const allHandfulOfCubesAreBelowMaxGreenAllowed = gameResult.handfulOfCubes
    .every((handful) => {
      return handful.greenCount <= maximumGreenAllowed;
    });
  return allHandfulOfCubesAreBelowMaxGreenAllowed;
}

function part1(input: string): number {
  const gameResults = parse(input);
  const maximumRedAllowed = 12;
  const maximumGreenAllowed = 13;
  const maximumBlueAllowed = 14;
  const gamesThatMeetCriteria = gameResults.filter((gameResult) => {
    const meetsRedCriteria = areAllHandfulOfCubesBelowMaxRedAllowed(
      gameResult,
      maximumRedAllowed,
    );
    const meetsGreenCriteria = areAllHandfulOfCubesBelowMaxGreenAllowed(
      gameResult,
      maximumGreenAllowed,
    );
    const meetsBlueCriteria = areAllHandfulOfCubesBelowMaxBlueAllowed(
      gameResult,
      maximumBlueAllowed,
    );
    const meetsAllCriteria = meetsRedCriteria && meetsGreenCriteria &&
      meetsBlueCriteria;
    return meetsAllCriteria;
  });

  const summedGameIds = gamesThatMeetCriteria.map((gameResult) => gameResult.id)
    .reduce((sum, current) => sum + current, 0);
  return summedGameIds;
}

interface CubeCount {
  redCount: number;
  greenCount: number;
  blueCount: number;
}
function getMaxCubeCount(gameResult: GameResult): CubeCount {
  const maxCubeCount: CubeCount = {
    redCount: getMaxRedCount(gameResult),
    greenCount: getMaxGreenCount(gameResult),
    blueCount: getMaxBlueCount(gameResult),
  };
  return maxCubeCount;
}

function getMaxRedCount(gameResult: GameResult): number {
  const maxRedCount = gameResult.handfulOfCubes.reduce(
    (min, current) => {
      return Math.max(min, current.redCount);
    },
    0,
  );
  return maxRedCount;
}

function getMaxGreenCount(gameResult: GameResult): number {
  const maxGreenCount = gameResult.handfulOfCubes.reduce(
    (min, current) => {
      return Math.max(min, current.greenCount);
    },
    0,
  );
  return maxGreenCount;
}

function getMaxBlueCount(gameResult: GameResult): number {
  const maxBlueCount = gameResult.handfulOfCubes.reduce(
    (min, current) => {
      return Math.max(min, current.blueCount);
    },
    0,
  );
  return maxBlueCount;
}

function part2(input: string): number {
  const gameResults = parse(input);
  const cubeCounts = gameResults.map((gameResult) => {
    const maxCubeCount = getMaxCubeCount(gameResult);
    return maxCubeCount;
  });
  const powers = cubeCounts.map((cubeCount) => {
    const power = cubeCount.redCount * cubeCount.greenCount *
      cubeCount.blueCount;
    return power;
  });
  const summedPowers = powers.reduce((sum, current) => sum + current, 0);
  return summedPowers;
}

if (import.meta.main) {
  runPart(2023, 2, 1, part1);
  runPart(2023, 2, 2, part2);
}

const TEST_INPUT = `\
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`;

Deno.test("part1", () => {
  assertEquals(part1(TEST_INPUT), 8);
});

Deno.test("part2", () => {
  assertEquals(part2(TEST_INPUT), 2286);
});
