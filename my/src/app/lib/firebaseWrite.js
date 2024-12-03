import { ref, push, set } from "firebase/database";
import { database } from "./firebase"; // Adjust the path as needed

// Add a new journal entry
export const firebaseWrite = async (entryData) => {
  try {
    // Create a reference to the journalEntries node
    const journalRef = ref(database, "journalEntries");

    // Push a new entry and get its unique key
    const newRef = push(journalRef);

    // Set the entry data at the newly created reference
    await set(newRef, entryData);

    console.log("Entry added successfully");
  } catch (error) {
    console.error("Error adding entry: ", error);
  }
};
