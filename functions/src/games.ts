import {
  DocumentData,
  FieldValue,
  getFirestore,
} from "firebase-admin/firestore";
import { HttpsError } from "firebase-functions/v2/https";
import { Card, Cards } from "./model/Card";
import { GameData } from "./model/Game";
import { Hand } from "./model/Hand";
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
const id = (id: string): string => `${GAMES}/${id}`;

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
  const gameRef = db.doc(`${id(gameId)}`).withConverter(gameConverter);
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

export const beginGame = async (gameId: string): Promise<void> => {
  const db = getFirestore();
  const gameRef = db.doc(id(gameId)).withConverter(gameConverter);
  db.runTransaction(async (t) => {
    const result = await t.get(gameRef);
    if (!result.exists) {
      throw new HttpsError("not-found", `gameId: ${gameId} not found`);
    }

    const game = result.data();
    if (game) {
      const players = game.players;
      const deck = game.deck;
      const hands = deal(deck, players);

      t.update(gameRef, {
        deck,
        hands,
        nextPlayer: players[0],
        state: "in-progress",
      });
    }
  });
};

export const addPlayerToGame = async (
  gameId: string,
  playerId: string
): Promise<void> => {
  const db = getFirestore();
  const gameRef = db.doc(id(gameId)).withConverter(gameConverter);
  await gameRef.update({ playerIds: FieldValue.arrayUnion(playerId) });
};
