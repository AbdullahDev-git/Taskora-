// ============================================
// FIREBASE CONFIGURATION
// ============================================
// Replace these with your Firebase credentials from the Firebase Console
// https://console.firebase.google.com

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmQ6sz3udLFrBWo4iPfjDyFgqTmgL6tWM",
  authDomain: "taskora-bd257.firebaseapp.com",
  projectId: "taskora-bd257",
  storageBucket: "taskora-bd257.firebasestorage.app",
  messagingSenderId: "681142272835",
  appId: "1:681142272835:web:f71e947b3f18eb082925f6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
