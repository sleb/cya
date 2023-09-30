import { Card } from "./Card";

export interface Game extends GameData {
  id: string;
}

export interface GameData {
  name: string;
  deck: Card[];
  dateInSecondsFromEpoch: number;
  playerIds: string[];
}
