import { summarizeScoresByPlayer, roundsToFormData } from "./game";
import { Round } from "./round";

const rounds: Round[] = [
  {
    startTime: 1,
    playerScores: [
      { player: { name: "bob", id: "1" }, score: 10 },
      { player: { name: "bill", id: "2" }, score: 50 },
    ],
  },
  {
    startTime: 2,
    playerScores: [
      { player: { name: "bob", id: "1" }, score: 90 },
      { player: { name: "bill", id: "2" }, score: 150 },
    ],
  },
];

test("summarize socres", () => {
  expect(summarizeScoresByPlayer(rounds)).toEqual({ bob: 100, bill: 200 });
});

test("to form data", () => {
  expect(roundsToFormData(rounds)).toEqual({
    scores: {
      bob: [10, 90],
      bill: [50, 150],
    },
  });
});
