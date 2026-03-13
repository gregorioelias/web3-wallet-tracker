"use client";

import { useState } from "react";

export default function WalletViewer() {

  const [address, setAddress] = useState("");
  const [data, setData] = useState(null);

  async function fetchWallet() {

    const res = await fetch(
      `http://localhost:4000/wallet/${address}`
    );

    const json = await res.json();

    setData(json);

  }

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Web3 Wallet Tracker
      </h1>

      <div className="mb-6">

        <input
          className="border p-2 mr-2 w-96"
          placeholder="Enter wallet address"
          value={address}
          onChange={(e)=>setAddress(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white p-2 px-4"
          onClick={fetchWallet}
        >
          Search
        </button>

      </div>

      {data && (

        <div>

          <h2 className="text-xl mb-4">
            ETH Balance: {data.ethBalance}
          </h2>

          <h3 className="text-lg font-semibold mb-2">
            Tokens
          </h3>

          <div className="grid grid-cols-3 gap-4">

            {data.tokens.map((token, index) => (

              <div
                key={index}
                className="border p-4 rounded"
              >

                <p className="font-bold">
                  {token.symbol}
                </p>

                <p>
                  {token.name}
                </p>

                <p className="text-sm text-gray-500">
                  {token.balance}
                </p>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>

  );

}