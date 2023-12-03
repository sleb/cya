import { createContext } from "react";
import { Message } from "../model/Message";

const emptyFunc = () => {};

export const MessageContext = createContext<{
  message: Message | null;
  error: (text: string) => void;
  warn: (text: string) => void;
  info: (text: string) => void;
  setMessage: (message: Message | null) => void;
}>({
  message: null,
  setMessage: emptyFunc,
  error: emptyFunc,
  info: emptyFunc,
  warn: emptyFunc,
});
