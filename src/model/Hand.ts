import { Card } from "./Card";
import { Player } from "./Player";

export interface Hand {
  player: Player;
  cards: Card[];
}
