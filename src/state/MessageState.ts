import { atom } from "recoil";
import { Message } from "../model/Message";

export const messageState = atom<Message | null>({
  key: "messageState",
  default: null,
});
