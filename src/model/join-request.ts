import { User } from "./user";

export interface JoinRequestData {
  gameId: string;
  user: User;
  message?: string;
}

export interface JoinRequest extends JoinRequestData {
  id: string;
}
