export interface JoinRequestData {
  gameId: string;
  requestor: {
    id: string;
    displayName: string;
    message?: string;
  };
}

export interface JoinRequest extends JoinRequestData {
  id: string;
}
