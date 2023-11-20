import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  SnapshotOptions,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  query,
  runTransaction,
  where,
} from "firebase/firestore";
import { app } from "../firebase";
import { AssetStack } from "../model/Asset";
import { Card, Cards } from "../model/Card";
import { Game, GameData, getHandForPlayer } from "../model/Game";
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

export const deleteGame = (gameId: string): Promise<void> => {
  const docRef = gameRef(gameId);
  return deleteDoc(docRef);
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
    bases: [],
    assets: [],
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
  const hands: Hand[] = players.map((player) => ({
    player,
    cards: [],
  }));
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
    const gameData = result.data();
    if (gameData) {
      const players = gameData.players;

      const deck = newDeck();
      shuffle(deck);

      const hands = deal(deck, players);

      const assets: AssetStack[] = players.map((player) => ({
        player,
        assets: [],
      }));

      t.update(docRef, {
        deck,
        hands,
        assets,
        nextPlayer: players[0],
        state: "in-progress",
      });
    }
  });
};

export const discard = (
  gameId: string,
  playerId: string,
  card: Card
): Promise<void> => {
  const docRef = gameRef(gameId);

  return runTransaction(getFirestore(app), async (t) => {
    const result = await t.get(docRef);
    const gameData = result.data();
    if (!gameData) {
      throw new Error("game not found");
    }

    const { hands, discard, deck } = gameData;

    const playerHand = getHandForPlayer(hands, playerId);
    if (!playerHand) {
      throw new Error("no hand for player");
    }

    const discardIndex = playerHand.cards.indexOf(card);
    if (discardIndex < 0) {
      throw new Error("player hand does not contain the discarded card");
    }
    playerHand.cards.splice(discardIndex, 1);
    discard.push(card);

    const newCard = deck.pop();
    if (newCard) {
      playerHand.cards.push(newCard);
    }

    t.update(docRef, {
      deck,
      hands,
      discard,
    });
  });
};

export const onGamesChange = (
  userId: string,
  cb: (games: Game[]) => void,
  errCb: (e: Error) => void
): (() => void) => {
  const collectionRef = gamesRef();
  const q = query(collectionRef, where("playerIds", "array-contains", userId));
  return onSnapshot(
    q,
    (querySnap) => {
      const games: Game[] = querySnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      cb(games);
    },
    errCb
  );
};

export const onGameChange = (
  gameId: string,
  cb: (game: Game | null) => void
): (() => void) => {
  return onSnapshot(gameRef(gameId), async (gameSnap) => {
    const gameData = await gameSnap.data();
    const game: Game | null = gameData
      ? { id: gameSnap.id, ...gameData }
      : null;
    cb(game);
  });
};
