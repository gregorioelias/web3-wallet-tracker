"use client";

import { useState, useEffect } from "react";

export default function WalletViewer() {

  const [address, setAddress] = useState("");
  const [data, setData] = useState(null);
  const [whales, setWhales] = useState([]);
  const [newTokens, setNewTokens] = useState([]);
  const [transfers, setTransfers] = useState([]);

  async function fetchWallet() {

    const res = await fetch(
      `http://localhost:4000/wallet/${address}`
    );

    const json = await res.json();

    setData(json);

    fetchTransfers(address);

  }

  async function fetchWhales() {

    const res = await fetch(
      "http://localhost:4000/wallet/whales"
    );

    const json = await res.json();

    setWhales(json);
  }

  useEffect(() => {
    fetchWhales();
    fetchNewTokens();
  }, []);

  async function fetchTransfers(addr) {

    const res = await fetch(
      `http://localhost:4000/wallet/${addr}/transfers`
    );

    const json = await res.json();

    setTransfers(json);

  }

  async function fetchNewTokens() {

    const res = await fetch(
      "http://localhost:4000/wallet/tokens/new"
    );

    const json = await res.json();

    setNewTokens(json);

  }

  return (

    <div className="max-w-3xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-6">
        Web3 Wallet Tracker
      </h1>

      <div className="mb-6">

        <input
          className="border p-2 mr-2 w-96"
          placeholder="Enter wallet address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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

          <h2>
            ETH Balance: {Number(data.ethBalance).toLocaleString(undefined, {
              maximumFractionDigits: 2
            })} ETH
          </h2>

          <h3 className="text-lg font-semibold mb-2">
            Tokens
          </h3>

          <div className="grid grid-cols-3 gap-4">

            {data.tokens.map((token, i) => (

              <div
                key={i}
                className="border p-4 rounded-lg mb-3 bg-gray-900"
              >

                <div className="flex justify-between">

                  <div>
                    <p className="font-bold">{token.symbol}</p>
                    <p className="text-gray-400 text-sm">
                      {token.name}
                    </p>
                  </div>

                  <div className="font-mono">
                    {token.balance}
                  </div>

                </div>

              </div>

            ))}

          </div>

          <h2 className="text-xl font-bold mt-10 mb-4">
            Recent Transfers
          </h2>

          <div className="max-h-64 overflow-y-auto">

            {transfers.map((t, i) => (

              <div
                key={i}
                className="border p-3 rounded mb-2"
              >

                <p>
                  {Number(t.value).toFixed(4)} {t.asset}
                </p>

                <p className="text-sm text-gray-400">
                  → {t.to.slice(0, 6)}
                </p>

              </div>

            ))}


          </div>

          <h2 className="text-xl font-bold mt-10 mb-4">
            Whale Activity
          </h2>

          {whales.map((w, i) => (

            <div
              key={i}
              className="border p-3 rounded mb-2"
            >

              <p>
                {Number(w.value).toFixed(2)} ETH
              </p>

              <p className="text-sm text-gray-400">
                {w.from.slice(0, 6)} → {w.to.slice(0, 6)}
              </p>

            </div>

          ))}

          <h2 className="text-xl font-bold mt-10 mb-4">
            New Tokens
          </h2>
          
           <div className="max-h-64 overflow-y-auto">

          {newTokens.map((t, i) => (

            <div
              key={i}
              className="border p-3 rounded mb-2"
            >

              <p className="font-bold">
                {t.token}
              </p>

              <p className="text-sm text-gray-400">
                {t.contract?.slice(0, 10)}
              </p>

            </div>

          ))}

        </div>

        </div>

      )}

    </div>

  );

}