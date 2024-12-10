"use client";
import { useState, useEffect } from "react";
import img2 from '../fonts/img2.png'
const Inputs = () => {
  const [trade, setTrade] = useState({
    pair: "",
    entryPrice: "",
    exitPrice: "",
    lotSize: "",
    direction: "",
    notes: "",
    ProfitorLoss:"",
    date: new Date().toISOString().split("T")[0], // Default date is today's date
  });

  const [trades, setTrades] = useState([]);
  const [editingTradeId, setEditingTradeId] = useState(null);

  // Load trades from localStorage on component mount
  useEffect(() => {
    const savedTrades = localStorage.getItem("trades");
    if (savedTrades) {
      setTrades(JSON.parse(savedTrades));
    }
  }, []);

  const handleSubmit = (e) => {
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

    // Add or update trade
    if (editingTradeId !== null) {
      // Modify existing trade
      const updatedTrades = trades.map((t) =>
        t.id === editingTradeId ? { ...t, ...preparedTrade } : t
      );
      localStorage.setItem("trades", JSON.stringify(updatedTrades));
      setTrades(updatedTrades);
      setEditingTradeId(null);
    } else {
      // Add new trade
      const newTrade = { ...preparedTrade, id: Date.now().toString() };
      const updatedTrades = [...trades, newTrade];
      localStorage.setItem("trades", JSON.stringify(updatedTrades));
      setTrades(updatedTrades);
    }

    // Reset form
    setTrade({
      pair: "",
      entryPrice: "",
      exitPrice: "",
      lotSize: "",
      direction: "",
      notes: "",
      date: new Date().toISOString().split("T")[0],
    });

    alert("Trade added/modified successfully!");
  };

  const handleEdit = (tradeId) => {
    const tradeToEdit = trades.find((trade) => trade.id === tradeId);
    if (tradeToEdit) {
      setTrade({
        ...tradeToEdit,
        entryPrice: tradeToEdit.entryPrice.toString(),
        exitPrice: tradeToEdit.exitPrice.toString(),
        lotSize: tradeToEdit.lotSize.toString(),
        date: tradeToEdit.date,
      });
      setEditingTradeId(tradeId);
    }
  };

  const handleDelete = (tradeId) => {
    const updatedTrades = trades.filter((trade) => trade.id !== tradeId);
    localStorage.setItem("trades", JSON.stringify(updatedTrades));
    setTrades(updatedTrades);
  };

  return (
    <div className="flex flex-col bg-cover bg min-h-screen gap-3 font-title" style={{backgroundImage:`url(${img2.src})`}}>
      <h1 className="font-title text-white flex flex-row justify-center items-center text-4xl my-4">FXLogger</h1>

      <form onSubmit={handleSubmit} className="" >
        <div className="flex flex-col justify-center items-center w-[95%]  m-auto gap-2 ">
      
        <div className="w-4/5 flex flex-row justify-center items-center m-auto flex-wrap gap-3">
        
        <input
  type="text"
  placeholder="Currency Pair"
  value={trade.pair || ""} // Ensures it’s never undefined
  onChange={(e) => setTrade({ ...trade, pair: e.target.value })}
  className="p-4 border-4 rounded-xl border-green-950 shadow-2xl"
/>
<input
  type="number"
  placeholder="Entry Price"
  value={trade.entryPrice || ""} // Default to an empty string if undefined
  onChange={(e) => setTrade({ ...trade, entryPrice: e.target.value })}
  className="p-4 border-4 rounded-xl border-green-950 shadow-2xl"
/>
        <input
          type="number"
          placeholder="Exit Price"
          value={trade.exitPrice}
          onChange={(e) => setTrade({ ...trade, exitPrice: e.target.value })}
          className="p-4 border-4 rounded-xl border-green-950 shadow-2xl"
        />
        <input
          type="number"
          placeholder="Lot size"
          value={trade.lotSize}
          onChange={(e) => setTrade({ ...trade, lotSize: e.target.value })}
          className="p-4 border-4 rounded-xl border-green-950 shadow-2xl"
        />
        <input
          type='number'
          placeholder='p/l'
          value={trade.ProfitorLoss}
          onChange={(e) => setTrade({ ...trade, ProfitorLoss: e.target.value })}
          className="p-4 border-4 rounded-xl border-green-950 shadow-2xl"
        />
        <input
          type="text"
          placeholder="Notes"
          value={trade.notes}
          onChange={(e) => setTrade({ ...trade, notes: e.target.value })}
          className="p-4 border-4 rounded-xl border-green-950 shadow-2xl"
        />
   </div>
   <input
          type="date"
          value={trade.date}
          onChange={(e) => setTrade({ ...trade, date: e.target.value })}
        className="p-3 border-4 rounded-xl"
        />
        {/* ///////////// */}
        <div className="flex flex-row gap-3">
          <button className="bg-green-950 rounded-md text-white px-10 py-3 shadow-xl " onClick={() => setTrade({...trade,direction:'Buy'})} type='button'>
            Buy
          </button>
          <button className="bg-rose-950 rounded-md text-white px-10 py-3 shadow-xl " onClick={() => setTrade({...trade , direction:'Sell'})} type='button'>
            Sell          </button>
        </div>
        {/* ////////////// */}
        
        {/* ////////////////////// */}
        </div>
        <button type="submit" className="p-4 bg-gray-500 flex flex-row justify-center items-center mx-auto my-2 font-title text-white rounded-md">{editingTradeId ? "Update Trade" : "Add Trade"}</button>
      </form>

      <h2 className="border-b-2 font-title text-white text-2xl">Trade Journal</h2>
      {trades.length === 0 ? (
        <p>No trades to display.</p>
      ) : (
        <ul className="font-body">
  {trades
    .slice()
    .reverse() // Reverse the order to show the latest entry first
    .map((trade) => (
      <li className="text-white uppercase bg-black p-4 border-2" key={trade.id}>
        <h3 className="text-2xl">{trade.pair}</h3>
        <h3><span>Entry price</span> {trade.entryPrice}</h3>
        <h3><span>Exit price</span>{trade.exitPrice}</h3>
        <h3>{trade.direction}</h3>
        <h3>P/L: {trade.ProfitorLoss} USD</h3>
        <p>Notes: {trade.notes}</p>
        <h3> Lot Size: {trade.lotSize}</h3>
        <h3>Date: {new Date(trade.date).toLocaleDateString()}</h3>
        <h3>Timestamp: {new Date(trade.timestamp).toLocaleString()}</h3>
        <div className="flex flex-row gap-3">
          <button
            onClick={() => handleEdit(trade.id)}
            className="bg-gradient-to-r from-cyan-950 to-gray-950 py-2 px-6 rounded-lg"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(trade.id)}
            className="bg-gradient-to-r from-gray-950 to-green-950 p-4 rounded-lg"
          >
            Delete
          </button>
        </div>
      </li>
    ))}
</ul>

      )}
    </div>
  );
};

export default Inputs;
