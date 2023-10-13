export interface JoinRequestData {
  game: {
    id: string;
    name: string;
  };
  approverIds: string[];
  requestor: {
    id: string;
    displayName: string;
    message?: string;
  };
}

export interface JoinRequest extends JoinRequestData {
  id: string;
}
