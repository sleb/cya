import {
  GoogleAuthProvider,
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { app } from "../firebase";

export const signInUser = async (): Promise<string | null> => {
  await signInWithRedirect(getAuth(app), new GoogleAuthProvider());
  const credential = await getRedirectResult(getAuth(app));

  return credential?.user?.uid ?? null;
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
