import { Card } from "./Card";
import { Player } from "./Player";

export interface Asset {
  card: Card;
  value: number;
}
export interface AssetStack {
  player: Player;
  assets: Asset[];
}
