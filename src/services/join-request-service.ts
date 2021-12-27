import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { app } from "../firebase";
import { Game } from "../model/game";
import { JoinRequest, JoinRequestData } from "../model/join-request";
import { User } from "../model/user";

const converter = {
  toFirestore: (joinRequestData: JoinRequestData) => joinRequestData,
  fromFirestore: (snap: DocumentData) => snap.data() as JoinRequestData,
};

export const createJoinRequest = async (
  gameId: string,
  user: User,
  message?: string
) => {
  const db = getFirestore(app);
  const collectionRef = collection(db, "join-requests").withConverter(
    converter
  );

  try {
    await addDoc(collectionRef, {
      gameId,
      user,
      message: message || "",
    });
  } catch (err) {
    throw new Error(`Failed to create new join request ${err}`);
  }
};

export const getJoinRequests = async (
  gameId: string
): Promise<JoinRequest[]> => {
  const db = getFirestore(app);
  const q = query(
    collection(db, "join-requests"),
    where("gameId", "==", gameId)
  ).withConverter(converter);

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deleteJoinRequest = async (
  joinRequestId: string
): Promise<void> => {
  const db = getFirestore(app);
  await deleteDoc(doc(db, "join-requests", joinRequestId));
};

export const onJoinRequestSnapshot = (
  game: Game,
  next: (joinRequests: JoinRequest[]) => void,
  error: (err: Error) => void
): (() => void) => {
  const db = getFirestore(app);
  const q = query(
    collection(db, "join-requests"),
    where("gameId", "==", game.id)
  ).withConverter(converter);

  return onSnapshot(
    q,
    (snap) => {
      next(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    },
    error
  );
};
