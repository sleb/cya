import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  SnapshotOptions,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  runTransaction,
  setDoc,
  where,
} from "firebase/firestore";
import { app } from "../firebase";
import { Game } from "../model/Game";
import { JoinRequest, JoinRequestData } from "../model/JoinRequest";
import { Player } from "../model/Player";
import { gameRef } from "./GameService";

const JOIN_REQUESTS = "join-requests";

const requestConverter = {
  toFirestore(data: JoinRequestData): DocumentData {
    return { ...data };
  },
  fromFirestore(
    snapshot: DocumentSnapshot,
    options: SnapshotOptions
  ): JoinRequestData {
    return snapshot.data(options) as JoinRequestData;
  },
};

const id = (gameId: string, uid: string): string => {
  return `${gameId}+${uid}`;
};

const joinRequestRef = (id: string): DocumentReference<JoinRequestData> => {
  const db = getFirestore(app);
  return doc(db, JOIN_REQUESTS, id).withConverter(requestConverter);
};

const joinRequestsRef = (): CollectionReference<JoinRequestData> => {
  const db = getFirestore(app);
  return collection(db, JOIN_REQUESTS).withConverter(requestConverter);
};

export const createJoinRequest = (
  game: Game,
  player: Player,
  message: string
): Promise<void> => {
  const docRef = joinRequestRef(id(game.id, player.uid));
  return setDoc(docRef, {
    game: { id: game.id, name: game.name },
    requestor: { id: player.uid, displayName: player.displayName, message },
    approverIds: game.playerIds,
  });
};

export const onJoinRequestChange = (
  gameId: string,
  uid: string,
  cb: (request: JoinRequest | null) => void
): (() => void) => {
  return onSnapshot(joinRequestRef(id(gameId, uid)), (requestSnap) => {
    if (requestSnap.exists()) {
      const request: JoinRequest = {
        id: requestSnap.id,
        ...requestSnap.data(),
      };
      cb(request);
    } else {
      cb(null);
    }
  });
};

export const getJoinRequestsForApprover = async (
  uid: string
): Promise<JoinRequest[]> => {
  const collectionRef = joinRequestsRef();
  const q = query(collectionRef, where("approverIds", "array-contains", uid));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const getJoinRequest = async (id: string): Promise<JoinRequest | null> => {
  const docRef = joinRequestRef(id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) {
    return null;
  }

  return { id: snap.id, ...snap.data() };
};

export const deleteJoinRequest = (id: string): Promise<void> => {
  const docRef = joinRequestRef(id);
  return deleteDoc(docRef);
};

export const approveJoinRequest = async (id: string) => {
  const request = await getJoinRequest(id);
  if (request) {
    const db = getFirestore(app);
    runTransaction(db, async (t) => {
      t.update(gameRef(request.game.id), {
        playerIds: arrayUnion(request.requestor.id),
        players: arrayUnion({
          uid: request.requestor.id,
          displayName: request.requestor.displayName,
        }),
      });
      t.delete(joinRequestRef(request.id));
    });
  }
};
