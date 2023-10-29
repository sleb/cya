import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  SnapshotOptions,
  addDoc,
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
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../firebase";
import { Card, Cards } from "../model/Card";
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

export const deleteGame = async (gameId: string): Promise<void> => {
  const functions = getFunctions(app);
  const deleteGameFun = httpsCallable<{ gameId: string }, void>(
    functions,
    "deleteGame"
  );
  await deleteGameFun({ gameId });
};

const createGame = async (gameData: GameData): Promise<string> => {
  const collectionRef = gamesRef();
  return (await addDoc(collectionRef, gameData)).id;
};

export const newGame = (name: string, player: Player): Promise<string> => {
  const deck = newDeck();
  shuffle(deck);

  return createGame({
    name,
    deck,
    dateInSecondsFromEpoch: Date.now() / 1000,
    playerIds: [player.uid],
    players: [player],
    discard: [],
    hands: [],
    state: "new",
  });
};

const newDeck = (): Card[] => {
  return Object.entries(Cards).flatMap(([k, v]) => {
    if (k === "Gold" || k === "Silver") {
      return new Array(5).fill(v);
    }
    return new Array(10).fill(v);
  });
};

const shuffle = (deck: Card[]) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
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
      const players = result.data().players;

      const deck = newDeck();
      shuffle(deck);

      const hands = deal(deck, players);

      t.update(docRef, {
        deck,
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
