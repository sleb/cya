import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../firebase";

export const signInUser = async (): Promise<string | null> => {
  const result = await signInWithPopup(getAuth(app), new GoogleAuthProvider());

  return result.user.uid;
};

export const signOutUser = (): Promise<void> => {
  return signOut(getAuth(app));
};

export const onUserChange = (
  cb: (uid: string | null) => void,
  err: (e: Error) => void
): (() => void) => {
  return onAuthStateChanged(
    getAuth(app),
    (user) => {
      cb(user?.uid ?? null);
    },
    err
  );
};
