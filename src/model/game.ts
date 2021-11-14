import { Score } from "./score";
import { User } from "./user";

export interface GameData {
  name: string;
  cards: number;
  players: User[];
  rounds: Score[][];
  startTime: number;
}

export interface Game extends GameData {
  id: string;
}
