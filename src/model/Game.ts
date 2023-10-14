import { Card } from "./Card";
import { Hand } from "./Hand";
import { Player } from "./Player";

export interface Game extends GameData {
  id: string;
}

export interface GameData {
  name: string;
  deck: Card[];
  discard: Card[];
  dateInSecondsFromEpoch: number;
  playerIds: string[];
  players: Player[];
  hands: Hand[];
  state: "new" | "in-progress" | "complete";
  nextPlayer?: Player;
}
