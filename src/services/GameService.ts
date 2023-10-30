import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  SnapshotOptions,
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { app, functions } from "../firebase";
import { Game, GameData } from "../model/Game";
import { Player } from "../model/Player";

const gameConverter = {
  toFirestore(data: GameData): DocumentData {
    return { ...data };
  },
  fromFirestore(
    snapshot: DocumentSnapshot,
    options: SnapshotOptions
  ): GameData {
    return snapshot.data(options) as GameData;
  },
};

const GAMES = "games";

export const gameRef = (gameId: string): DocumentReference<GameData> => {
  const db = getFirestore(app);
  return doc(db, GAMES, gameId).withConverter(gameConverter);
};

const gamesRef = (): CollectionReference<GameData> => {
  const db = getFirestore(app);
  return collection(db, GAMES).withConverter(gameConverter);
};

export const getGame = async (gameId: string): Promise<Game | undefined> => {
  const docRef = gameRef(gameId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
};

const deleteGameFun = httpsCallable<{ gameId: string }, void>(
  functions,
  "deleteGame"
);
export const deleteGame = async (gameId: string): Promise<void> => {
  await deleteGameFun({ gameId });
};

const newGameFun = httpsCallable<
  { gameName: string; player: Player },
  { gameId: string }
>(functions, "newGame");
export const newGame = async (
  gameName: string,
  player: Player
): Promise<string> => {
  const result = await newGameFun({ gameName, player });
  return result.data.gameId;
};

const startGameFun = httpsCallable<{ gameId: string }, void>(
  functions,
  "startGame"
);
export const startGame = async (gameId: string): Promise<void> => {
  await startGameFun({ gameId });
};

export const onGamesChange = (
  userId: string,
  cb: (games: Game[]) => void
): (() => void) => {
  const collectionRef = gamesRef();
  const q = query(collectionRef, where("playerIds", "array-contains", userId));
  return onSnapshot(q, (querySnap) => {
    const games: Game[] = querySnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    cb(games);
  });
};

export const onGameChange = (
  gameId: string,
  cb: (game: Game) => void
): (() => void) => {
  return onSnapshot(gameRef(gameId), (gameSnap) => {
    if (gameSnap.exists()) {
      const game: Game = { id: gameSnap.id, ...gameSnap.data() };
      cb(game);
    }
  });
};

const addPlayerFun = httpsCallable<{ gameId: string; playerId: string }, void>(
  functions,
  "addPlayer"
);
export const addPlayer = async (
  gameId: string,
  playerId: string
): Promise<void> => {
  await addPlayerFun({ gameId, playerId });
};
