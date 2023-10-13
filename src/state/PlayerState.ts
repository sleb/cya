import { atom } from "recoil";
import { Player } from "../model/Player";

export const playerState = atom<Player | null>({
  key: "playerState",
  default: null,
});
