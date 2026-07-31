import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPmWgcDbMpGFmotRAu1SWSzrnMPlmRRMg",
  authDomain: "wct-reactjs.firebaseapp.com",
  projectId: "wct-reactjs",
  storageBucket: "wct-reactjs.firebasestorage.app",
  messagingSenderId: "546113496521",
  appId: "1:546113496521:web:8a88d3bd24e4b680d8f418",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);