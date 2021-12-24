import {
  addDoc,
  collection,
  DocumentData,
  getFirestore,
} from "firebase/firestore";
import { app } from "../firebase";
import { JoinRequestData } from "../model/join-request";

const converter = {
  toFirestore: (joinRequestData: JoinRequestData) => joinRequestData,
  fromFirestore: (snap: DocumentData) => snap.data() as JoinRequestData,
};

export const createJoinRequest = async (
  gameId: string,
  userId: string,
  message?: string
) => {
  const db = getFirestore(app);
  const collectionRef = collection(db, "join-requests").withConverter(
    converter
  );

  try {
    await addDoc(collectionRef, {
      gameId,
      userId,
      message,
    });
  } catch (err) {
    throw new Error(`Failed to create new join request ${err}`);
  }
};
