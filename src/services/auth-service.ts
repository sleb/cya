import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";

import { app } from "../firebase";
import { User } from "../model/user";

export const signUpUser = async (
  name: string,
  email: string,
  password: string
): Promise<User | undefined> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      getAuth(app),
      email,
      password
    );

    if (userCredential) {
      updateProfile(userCredential.user, { displayName: name });
      return { id: userCredential.user.uid, name };
    }

    return;
  } catch ({ code, message }) {
    switch (code) {
      case "auth/email-already-in-use":
        throw new Error("Email already in use");
      case "auth/invalid-email":
        throw new Error("Invalid email");
      case "auth/weak-password":
        throw new Error("Weak password");
      default:
        console.log(`error: code=${code} message=${message}`);
        throw new Error("Unknown error");
    }
  }
};

export const signInUser = async (email: string, password: string) => {
  return signInWithEmailAndPassword(getAuth(app), email, password).catch(
    (err) => {
      switch (err.code) {
        case "auth/invalid-email":
          throw new Error("Invalid email");
        case "auth/user-disabled":
          throw new Error("User disabled");
        case "auth/user-not-found":
          throw new Error("User not found");
        case "auth/wrong-password":
          throw new Error("Incorrect password");
        case "auth/too-many-requests":
          throw new Error("Account disabled. Too many failed attempts");
        default:
          console.log(`error: code=${err.code} message=${err.message}`);
          throw new Error("Unknown error");
      }
    }
  );
};

export const onAuthChange = (fn: (user: User | null) => void): (() => void) => {
  const unsubscribe = onAuthStateChanged(getAuth(app), (user) => {
    fn(user ? { id: user.uid, name: user.displayName || "" } : null);
  });
  return unsubscribe;
};

export const signOutUser = async () => {
  console.log("signOutUser");

  return signOut(getAuth(app));
};

export const currentUser = async (): Promise<User | null> => {
  const authUser = getAuth(app).currentUser;
  if (authUser) {
    return { id: authUser.uid, name: authUser.displayName! };
  }
  return null;
};
