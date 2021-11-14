import { getApp, getApps, initializeApp } from "firebase/app";

export const app =
  getApps().length === 0
    ? initializeApp({
        apiKey: "AIzaSyCYKqfhEiWuk-euJpEqmqDJ-FJxivmlKa4",
        authDomain: "cover-your-assets-425b1.firebaseapp.com",
        projectId: "cover-your-assets-425b1",
        storageBucket: "cover-your-assets-425b1.appspot.com",
        messagingSenderId: "30060980379",
        appId: "1:30060980379:web:5cb93f0717ec0df63abe3e",
        measurementId: "G-JFETRWPCZQ",
      })
    : getApp();
