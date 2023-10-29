import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  SnapshotOptions,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  query,
  runTransaction,
  updateDoc,
  where,
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { app, functions } from "../firebase";
import { Card } from "../model/Card";
import { Game, GameData } from "../model/Game";
import { Hand } from "../model/Hand";
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

const deal = (deck: Card[], players: Player[]): Hand[] => {
  const hands: Hand[] = players.map((p) => ({ playerId: p.uid, cards: [] }));
  let cards = 0;
  while (cards < 4) {
    for (const hand of hands) {
      const topCard = deck.pop();
      if (!topCard) {
        throw "too few cards in the deck!";
      }

      hand.cards.push(topCard);
    }
    cards += 1;
  }
  return hands;
};

export const startGame = (gameId: string): Promise<void> => {
  const docRef = gameRef(gameId);

  return runTransaction(getFirestore(app), async (t) => {
    const result = await t.get(docRef);
    if (result.exists()) {
      const game = result.data();
      const players = game.players;

      const hands = deal(game.deck, players);

      t.update(docRef, {
        deck: game.deck,
        hands,
        nextPlayer: players[0],
        state: "in-progress",
      });
    }
  });
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

export const addPlayer = (gameId: string, playerId: string): Promise<void> => {
  const docRef = gameRef(gameId);
  return updateDoc(docRef, { playerIds: arrayUnion(playerId) });
};
