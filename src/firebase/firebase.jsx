// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_zVPKoAa2i5Vo-IpQKBdfTA_LsLfXdzg",
  authDomain: "bookverse-3ce7e.firebaseapp.com",
  projectId: "bookverse-3ce7e",
  storageBucket: "bookverse-3ce7e.firebasestorage.app",
  messagingSenderId: "194339850554",
  appId: "1:194339850554:web:e47bc485b59ddb374f6803",
  measurementId: "G-8BF0Q83LSD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);