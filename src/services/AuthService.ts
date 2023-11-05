import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../firebase";
import { Player } from "../model/Player";

export const signInUser = async (): Promise<string | null> => {
  const result = await signInWithPopup(getAuth(app), new GoogleAuthProvider());

  return result.user.uid;
};

export const signOutUser = (): Promise<void> => {
  return signOut(getAuth(app));
};

export const onUserChange = (
  cb: (player: Player | null) => void,
  err: (e: Error) => void
): (() => void) => {
  return onAuthStateChanged(
    getAuth(app),
    (user) => {
      if (user) {
        // TODO: random name generator https://github.com/sleb/cya/issues/3
        cb({ uid: user.uid, displayName: user.displayName ?? "random name" });
      } else {
        cb(null);
      }
    },
    err
  );
};
