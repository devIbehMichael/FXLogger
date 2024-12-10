'use client'
import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig"; // Firebase config
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { auth } from "../firebase/firebaseConfig"; // Firebase auth

const Dashboard = () => {
  const [trades, setTrades] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/login"); // If user is not logged in, redirect to login
    } else {
      const fetchUserTrades = async () => {
        const q = query(
          collection(db, "users", auth.currentUser.uid, "trades") // Get trades under the user's uid
        );
        const querySnapshot = await getDocs(q);
        const tradesArray = [];
        querySnapshot.forEach((doc) => {
          tradesArray.push(doc.data());
        });
        setTrades(tradesArray); // Set user's trades data
      };

      fetchUserTrades();
    }
  }, [router]);

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {trades.map((trade, index) => (
          <li key={index}>
            {trade.pair}: {trade.entryPrice} - {trade.exitPrice} ({trade.direction}) {trade.notes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
