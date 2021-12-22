import { summarizeScoresByPlayer } from "./game";
import { Round } from "./round";

test("summarize socres", () => {
  const rounds: Round[] = [
    {
      num: 1,
      scores: [
        { player: { name: "bob", id: "1" }, score: 10 },
        { player: { name: "bill", id: "2" }, score: 50 },
      ],
    },
    {
      num: 2,
      scores: [
        { player: { name: "bob", id: "1" }, score: 90 },
        { player: { name: "bill", id: "2" }, score: 150 },
      ],
    },
  ];

  expect(summarizeScoresByPlayer(rounds)).toEqual(
    new Map([
      ["bob", 100],
      ["bill", 200],
    ])
  );
});
