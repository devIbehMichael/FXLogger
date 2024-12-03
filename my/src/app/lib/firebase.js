// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Replace these values with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCmjBnqlRNe2RFkYrOgYwkMUvuJjk5V8zU",
  authDomain: "fxlogger-d624c.firebaseapp.com",
  projectId: "fxlogger-d624c",
  storageBucket: "fxlogger-d624c.firebasestorage.app",
  messagingSenderId: "216991661032",
  appId: "1:216991661032:web:3e1d599bce98c1a609425d",
  measurementId: "G-6WC9MF4TE1",
  databaseURL: "https://fxlogger-d624c-default-rtdb.firebaseio.com/", // Realtime Database URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export database and authentication services
export const database = getDatabase(app);
export const auth = getAuth(app);



