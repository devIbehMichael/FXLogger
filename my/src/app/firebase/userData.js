import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Save user-specific data
export const saveUserData = async (uid, data) => {
  try {
    await setDoc(doc(db, "users", uid), data);
    console.log("User data saved successfully!");
  } catch (error) {
    console.error("Error saving user data:", error.message);
  }
};

// Fetch user-specific data
export const fetchUserData = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    return null;
  }
};
