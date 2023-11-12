import { Card } from "./Card";

export interface Asset {
  card: Card;
  value: number;
}
export interface AssetStack {
  playerId: string;
  assets: Asset[];
}
