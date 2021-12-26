import { User } from "./user";

export interface PlayerScore {
  player: User;
  score: number;
}

export const formatScore = (score: number): string => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    notation: "compact",
  }).format(score);
};
