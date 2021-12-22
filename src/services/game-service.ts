import {
  DocumentData,
  collection,
  getFirestore,
  onSnapshot,
  addDoc,
  deleteDoc,
  where,
  query,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { app } from "../firebase";
import { Game, GameData } from "../model/game";
import { Round } from "../model/round";
import { User } from "../model/user";

const converter = {
  toFirestore: (gameData: GameData) => gameData,
  fromFirestore: (snap: DocumentData) => snap.data() as GameData,
};

export const createGame = async (user: User, name: string, cards: number) => {
  const db = getFirestore(app);
  const collectionRef = collection(db, "games").withConverter(converter);

  try {
    await addDoc(collectionRef, {
      name,
      players: [user],
      rounds: [],
      cards,
      startTime: Date.now(),
    });
  } catch (err) {
    throw new Error(`Failed to create new game ${err}`);
  }
};

export const deleteGame = async (id: string) => {
  const db = getFirestore(app);
  const gameDoc = doc(db, "games", id).withConverter(converter);

  try {
    await deleteDoc(gameDoc);
  } catch (err) {
    throw new Error(`Failed to delete game ${err}`);
  }
};

export const addUserToGame = async (
  gameId: string,
  user: User
): Promise<void> => {
  const db = getFirestore(app);
  const gameDoc = doc(db, "games", gameId).withConverter(converter);

  try {
    const gameData = await getDoc(gameDoc);
    if (gameData.exists()) {
      const players = gameData.data().players;
      if (!players.find((player) => player.id === user.id)) {
        players.push(user);
        updateDoc(gameDoc, { players });
      }
    }
  } catch (err) {
    throw new Error(`Failed to add user to game ${err}`);
  }
};

export const addRoundToGame = async (
  gameId: string,
  round: Round
): Promise<void> => {
  const db = getFirestore(app);
  const gameDoc = doc(db, "games", gameId).withConverter(converter);

  try {
    const gameData = await getDoc(gameDoc);
    if (gameData.exists()) {
      const rounds = gameData.data().rounds;
      rounds.push(round);
      updateDoc(gameDoc, { rounds });
    }
  } catch (err) {
    throw new Error(`Failed to add round to game ${err}`);
  }
};

export const getGame = async (id: string): Promise<Game> => {
  const db = getFirestore(app);
  const gameDoc = doc(db, "games", id).withConverter(converter);

  try {
    const gameData = await getDoc(gameDoc);
    if (gameData.exists()) {
      return { id, ...gameData.data() };
    } else {
      throw new Error(`Game ${id} does not exist`);
    }
  } catch (err) {
    throw new Error(`Failed to get game ${err}`);
  }
};

export const onGamesSnapshot = (
  user: User,
  next: (games: Game[]) => void,
  error: (err: Error) => void
): (() => void) => {
  const db = getFirestore(app);
  const q = query(
    collection(db, "games").withConverter(converter),
    where("players", "array-contains", user)
  );

  return onSnapshot(
    q,
    (snap) => {
      next(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    },
    error
  );
};
