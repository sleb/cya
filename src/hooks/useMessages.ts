import { useSetRecoilState } from "recoil";
import { messageState } from "../state/MessageState";

export interface Messages {
  error(msg: Error | string): void;
  success(msg: string): void;
  warning(msg: string): void;
}
export const useMessages = (): Messages => {
  const setMessage = useSetRecoilState(messageState);

  return {
    error: (e: Error | string) =>
      setMessage({ message: String(e), severity: "error" }),
    success: (msg: string) => setMessage({ message: msg, severity: "success" }),
    warning: (msg: string) => setMessage({ message: msg, severity: "warning" }),
  };
};
