import { ref, onValue } from "firebase/database";
import { database } from "./firebase"; // Adjust the path as needed

// Listen for real-time changes
export const firebaseListen = (callback) => {
  // Reference to the journalEntries node in the database
  const journalRef = ref(database, "journalEntries");

  // Attach a listener to listen for real-time updates
  const unsubscribe = onValue(journalRef, (snapshot) => {
    const entries = snapshot.val(); // Get the updated data
    callback(entries); // Pass the data to the callback function
  });

  // Return the unsubscribe function to stop listening when needed
  return unsubscribe;
};
