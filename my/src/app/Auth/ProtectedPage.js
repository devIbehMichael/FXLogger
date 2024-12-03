import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

const ProtectedPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // User is logged in
      } else {
        setUser(null); // User is not logged in
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  if (!user) {
    return <div>Please log in to access this page.</div>;
  }

  return <div>Welcome, {user.email}!</div>;
};

export default ProtectedPage;
