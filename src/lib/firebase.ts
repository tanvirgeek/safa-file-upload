import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCt96ITVjqRcChyxc2V74psAzv2I42QGSc",
  authDomain: "file-uploading-safa.firebaseapp.com",
  projectId: "file-uploading-safa",
  storageBucket: "file-uploading-safa.firebasestorage.app",
  messagingSenderId: "281577495423",
  appId: "1:281577495423:web:4c5a01514d0b7a7188984a",
  measurementId: "G-QYHJYDVYK0",
};

// Initialize Firebase app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Get Firestore instance
const db = getFirestore(app);

export { db };
