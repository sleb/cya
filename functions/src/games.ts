import { DocumentData, getFirestore } from "firebase-admin/firestore";
import { Card, Cards } from "./model/Card";
import { GameData } from "./model/Game";
import { Player } from "./model/Player";

const gameConverter = {
  toFirestore(data: GameData): DocumentData {
    return { ...data };
  },
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): GameData {
    return snapshot.data() as GameData;
  },
};

const GAMES = "games";

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

export const deleteGameById = async (gameId: string): Promise<void> => {
  const db = getFirestore();
  const gameRef = db.doc(`${GAMES}/${gameId}`).withConverter(gameConverter);
  await gameRef.delete();
};

export const initGame = async (
  gameName: string,
  player: Player
): Promise<string> => {
  const db = getFirestore();
  const gamesRef = db.collection(GAMES).withConverter(gameConverter);
  const deck = newDeck();
  shuffle(deck);
  const result = await gamesRef.add({
    name: gameName,
    dateInSecondsFromEpoch: Date.now() / 1000,
    deck: deck,
    discard: [],
    hands: [],
    playerIds: [player.uid],
    players: [player],
    state: "new",
  });
  return result.id;
};
