/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { initializeApp } from "firebase-admin/app";
import * as logger from "firebase-functions/logger";
import { HttpsError, onCall } from "firebase-functions/v2/https";
import { deleteGameById, initGame } from "./games";
import { Player } from "./model/Player";

initializeApp();

export const helloWorld = onCall<void, string>((req) => {
  logger.info(req.data);
  return "Hello from the backend!!";
});

export const deleteGame = onCall<{ gameId: string }, Promise<void>>(
  async (req) => {
    const gameId = req.data.gameId;
    if (!gameId) {
      throw new HttpsError("invalid-argument", "missing `gameId`");
    }
    logger.info(`delete requested for gameId: ${gameId}`);
    try {
      await deleteGameById(gameId);
      logger.info(`delete succeeded for gameId: ${gameId}`);
    } catch (e) {
      logger.error(`error: ${JSON.stringify(e)}`);
      throw e;
    }
  }
);

const nullOrEmpty = (s: string): boolean => !s || s.length === 0;

export const newGame = onCall<
  { gameName: string; player: Player },
  Promise<{ gameId: string }>
>(async (req) => {
  const gameName = req.data.gameName;
  if (nullOrEmpty(gameName)) {
    throw new HttpsError("invalid-argument", "missing `name`");
  }

  const player = req.data.player;
  if (!player) {
    throw new HttpsError("invalid-argument", "missing `player`");
  }

  logger.info(`create requested for gameName: ${gameName}`);
  try {
    const gameId = await initGame(gameName, player);
    logger.info(`create successful for gameId: ${gameId}`);
    return { gameId };
  } catch (e) {
    logger.error(`error: ${JSON.stringify(e)}`);
    throw e;
  }
});
