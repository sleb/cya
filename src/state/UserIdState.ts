import { atom } from "recoil";

export const userIdState = atom<string | null>({
  default: null,
  key: "userIdState",
});
