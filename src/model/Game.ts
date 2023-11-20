import { AssetStack } from "./Asset";
import { Base } from "./Base";
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
  bases: Base[];
  assets: AssetStack[];
  state: "new" | "in-progress" | "complete";
  nextPlayer?: Player;
}

export const getHandForPlayer = (
  hands: Hand[],
  playerId: string
): Hand | null => hands.find((h) => h.player.uid === playerId) || null;
