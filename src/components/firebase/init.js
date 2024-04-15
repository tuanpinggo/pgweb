import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB1PKkeATuksZdq9jFUQt7AGJhLvCS36fo",
  authDomain: "pinggoretailerprod.firebaseapp.com",
  databaseURL:
    "https://pinggoretailerprod-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pinggoretailerprod",
  storageBucket: "pinggoretailerprod.appspot.com",
  messagingSenderId: "310823583066",
  appId: "1:310823583066:web:b665f4cc767f83108b4763",
  measurementId: "G-DL893JS929",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authFirebase = getAuth(app);

export const realtimeDB = getDatabase(app);
