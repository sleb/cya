export interface JoinRequestData {
  game: {
    id: string;
    name: string;
  };
  approverIds: string[];
  requestor: {
    id: string;
    message: string;
  };
}

export interface JoinRequest extends JoinRequestData {
  id: string;
}
