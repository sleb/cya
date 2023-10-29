import { DocumentData, getFirestore } from "firebase-admin/firestore";
import { GameData } from "./model/Game";

const gameConverter = {
  toFirestore(data: GameData): DocumentData {
    return { ...data };
  },
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): GameData {
    return snapshot.data() as GameData;
  },
};

export const deleteGameById = async (gameId: string): Promise<void> => {
  const db = getFirestore();
  const gameRef = db.doc(`games/${gameId}`).withConverter(gameConverter);
  await gameRef.delete();
};
