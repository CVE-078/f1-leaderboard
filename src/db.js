import firebase from "firebase/app";
import "firebase/database";

export const db = firebase
  .initializeApp({
    databaseURL:
      "https://f1-leaderboard-e3cbf-default-rtdb.europe-west1.firebasedatabase.app/",
  })
  .database();
