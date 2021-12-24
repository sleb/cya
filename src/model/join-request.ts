export interface JoinRequestData {
  gameId: string;
  userId: string;
  message?: string;
}

export interface JoinRequest extends JoinRequestData {
  id: string;
}
