"use client";

import { useState } from "react";

export default function WalletViewer() {

  const [address, setAddress] = useState("");
  const [data, setData] = useState(null);

  async function fetchWallet() {

    const res = await fetch(`http://localhost:3000/wallet/${address}`);

    const json = await res.json();

    setData(json);

  }

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Wallet Tracker
      </h1>

      <input
        className="border p-2 mr-2"
        placeholder="Enter wallet address"
        value={address}
        onChange={(e)=>setAddress(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white p-2"
        onClick={fetchWallet}
      >
        Search
      </button>

      {data && (
        <pre className="mt-6">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}

    </div>
  );

}