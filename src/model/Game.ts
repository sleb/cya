import { Card } from "./Card";
import { Player } from "./Player";

export interface Game extends GameData {
  id: string;
}

export interface GameData {
  name: string;
  deck: Card[];
  dateInSecondsFromEpoch: number;
  playerIds: string[];
  players: Player[];
}
