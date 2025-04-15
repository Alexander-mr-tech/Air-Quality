// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCsWIe8sOUShJlNCArYF6DRmcid623CD1E",
  authDomain: "forest-observatory-ea334.firebaseapp.com",
  databaseURL: "https://forest-observatory-ea334-default-rtdb.firebaseio.com",
  projectId: "forest-observatory-ea334",
  storageBucket: "forest-observatory-ea334.firebasestorage.app",
  messagingSenderId: "631435987722",
  appId: "1:631435987722:web:efc156cb02530f356988f3",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { auth, database, createUserWithEmailAndPassword };
