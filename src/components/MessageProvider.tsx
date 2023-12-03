import { ReactElement, useState } from "react";
import { MessageContext } from "../contexts/MessageContext";
import { Message } from "../model/Message";

type Props = { children: ReactElement };

const MessageProvider = ({ children }: Props) => {
  const [message, setMessage] = useState<Message | null>(null);
  const error = (text: string) =>
    setMessage({ message: text, severity: "error" });
  const warn = (text: string) =>
    setMessage({ message: text, severity: "warning" });
  const info = (text: string) =>
    setMessage({ message: text, severity: "success" });
  return (
    <MessageContext.Provider value={{ message, setMessage, error, warn, info }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
