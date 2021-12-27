import { formatScore } from "./player-score";

test("format score", () => {
  expect(formatScore(100)).toEqual("$100");
  expect(formatScore(1000)).toEqual("$1K");
  expect(formatScore(10000)).toEqual("$10K");
  expect(formatScore(100000)).toEqual("$100K");
  expect(formatScore(1000000)).toEqual("$1M");
  expect(formatScore(125000)).toEqual("$125K");
  expect(formatScore(1325000)).toEqual("$1.325M");
});
