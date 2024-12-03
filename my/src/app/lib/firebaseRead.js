// lib/firebaseRead.js
import { database } from './firebase';

// Get all journal entries
export const getEntries = async () => {
  try {
    const snapshot = await database.ref('journalEntries').once('value');  // 'once' retrieves data once
    const entries = snapshot.val();  // snapshot.val() returns the data as a JavaScript object
    console.log(entries);  // You can return this data or use it in your app
    return entries;
  } catch (error) {
    console.error('Error getting entries: ', error);
  }
};
