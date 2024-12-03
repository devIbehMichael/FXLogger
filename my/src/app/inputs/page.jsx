'use client'
import { useState, useEffect } from "react";
import { firebaseWrite } from "../lib/firebaseWrite"; // Adjust path
import { firebaseListen } from "../lib/firebaseListen"; // Adjust path

const Inputs = () => {
  const [trade, setTrade] = useState({
    pair: "",
    entryPrice: "",
    exitPrice: "",
    lotSize: "",
    direction: "",
    notes: "",
  });

  const [trades, setTrades] = useState([]);

  // Fetch real-time updates
  useEffect(() => {
    const unsubscribe = firebaseListen((data) => {
      if (data) {
        const tradesList = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setTrades(tradesList);
      } else {
        setTrades([]);
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const preparedTrade = {
      ...trade,
      entryPrice: parseFloat(trade.entryPrice),
      exitPrice: parseFloat(trade.exitPrice),
      lotSize: parseFloat(trade.lotSize),
      timestamp: Date.now(),
    };

    if (isNaN(preparedTrade.entryPrice) || isNaN(preparedTrade.exitPrice) || isNaN(preparedTrade.lotSize)) {
      alert("Please enter valid numeric values for prices and lot size.");
      return;
    }

    try {
      await firebaseWrite(preparedTrade); // Write trade to Firebase
      setTrade({
        pair: "",
        entryPrice: "",
        exitPrice: "",
        lotSize: "",
        direction: "",
        notes: "",
      });
      alert("Trade added successfully!");
    } catch (error) {
      console.error("Failed to add trade:", error);
      alert("There was an error adding your trade. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Currency Pair"
          value={trade.pair}
          onChange={(e) => setTrade({ ...trade, pair: e.target.value })}
        />
        <input
          type="number"
          placeholder="Entry Price"
          value={trade.entryPrice}
          onChange={(e) => setTrade({ ...trade, entryPrice: e.target.value })}
        />
        <input
          type="number"
          placeholder="Exit Price"
          value={trade.exitPrice}
          onChange={(e) => setTrade({ ...trade, exitPrice: e.target.value })}
        />
        <input
          type="number"
          placeholder="Lot size"
          value={trade.lotSize}
          onChange={(e) => setTrade({ ...trade, lotSize: e.target.value })}
        />
        <input
          type="text"
          placeholder="Notes"
          value={trade.notes}
          onChange={(e) => setTrade({ ...trade, notes: e.target.value })}
        />
        <input
          type="text"
          placeholder="Buy/Sell"
          value={trade.direction}
          onChange={(e) => setTrade({ ...trade, direction: e.target.value })}
        />
        <button type="submit">Add Trade</button>
      </form>

      <h2>Trade Journal</h2>
      {trades.length === 0 ? (
        <p>No trades to display.</p>
      ) : (
        <ul>
          {trades.map((trade) => (
            <li key={trade.id}>
              {trade.pair}: {trade.entryPrice} - {trade.exitPrice} ({trade.direction}) <br />
              Notes: {trade.notes} <br />
              Lot Size: {trade.lotSize} <br />
              Timestamp: {new Date(trade.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Inputs;
