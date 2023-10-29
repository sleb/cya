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
import { deleteGameById } from "./games";

initializeApp();

export const helloWorld = onCall<void, string>((req) => {
  logger.info(req.data);
  return "Hello from the backend!!";
});

export const deleteGame = onCall<{ gameId: string }, void>(async (req) => {
  const gameId = req.data.gameId;
  if (!gameId) {
    throw new HttpsError("invalid-argument", "missing `gameId`");
  }
  logger.info(`delete requested for gameId: ${req.data.gameId}`);
  try {
    await deleteGameById(gameId);
    logger.info(`delete succeeded for gameId: ${req.data.gameId}`);
  } catch (e) {
    logger.error(`error: ${JSON.stringify(e)}`);
    throw e;
  }
});
