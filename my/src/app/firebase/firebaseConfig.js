import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCmjBnqlRNe2RFkYrOgYwkMUvuJjk5V8zU",
  authDomain: "fxlogger-d624c.firebaseapp.com",
  projectId: "fxlogger-d624c",
  storageBucket: "fxlogger-d624c.firebasestorage.app",
  messagingSenderId: "216991661032",
  appId: "1:216991661032:web:3e1d599bce98c1a609425d",
  measurementId: "G-6WC9MF4TE1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signUp = async (email, password, router) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userCredential.user);
    router.push("/profile"); // Redirect to profile page
  } catch (error) {
    console.error("Error signing up:", error.message);
    alert(`Error signing up: ${error.message}`);
  }
};

export const signIn = async (email, password, router) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in:", userCredential.user);
    router.push("/profile"); // Redirect to profile page
  } catch (error) {
    console.error("Error signing in:", error.message);
    alert(`Error signing in: ${error.message}`);
  }
};

export { auth, app };
