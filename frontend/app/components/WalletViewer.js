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

    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Web3 Wallet Tracker
      </h1>

      {/* SEARCH BAR */}

      <div className="flex gap-2 mb-8">

        <input
          className="flex-1 border border-gray-700 bg-black p-3 rounded"
          placeholder="Enter Ethereum wallet address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button
          className="bg-blue-600 hover:bg-blue-700 px-6 rounded"
          onClick={fetchWallet}
        >
          Search
        </button>

      </div>

      {data && (

        <div className="space-y-10">

          {/* WALLET SUMMARY */}

          <div className="border border-gray-800 p-6 rounded-xl bg-gray-900">

            <h2 className="text-xl font-semibold mb-2">
              Wallet Summary
            </h2>

            <p className="text-lg">
              ETH Balance: {Number(data.ethBalance).toLocaleString(undefined, {
                maximumFractionDigits: 2
              })} ETH
            </p>

          </div>


          {/* TOKENS */}

          <div>

            <h2 className="text-xl font-semibold mb-4">
              Tokens
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

              {data.tokens?.map((token, i) => (

                <div
                  key={i}
                  className="border border-gray-800 p-4 rounded-lg bg-gray-900"
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

          </div>


          {/* DASHBOARD GRID */}

          <div className="grid md:grid-cols-2 gap-8">


            {/* RECENT TRANSFERS */}

            <div>

              <h2 className="text-xl font-semibold mb-4">
                Recent Transfers
              </h2>

              <div className="max-h-64 overflow-y-auto space-y-2">

                {transfers?.map((t, i) => (

                  <div
                    key={i}
                    className="border border-gray-800 p-3 rounded bg-gray-900"
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

            </div>


            {/* WHALE ACTIVITY */}

            <div>

              <h2 className="text-xl font-semibold mb-4">
                Whale Activity
              </h2>

              <div className="space-y-2">

                {whales?.map((w, i) => (

                  <div
                    key={i}
                    className="border border-gray-800 p-3 rounded bg-gray-900"
                  >

                    <p>
                      {Number(w.value).toFixed(2)} ETH
                    </p>

                    <p className="text-sm text-gray-400">
                      {w.from.slice(0, 6)} → {w.to.slice(0, 6)}
                    </p>

                  </div>

                ))}

              </div>

            </div>


            {/* NEW TOKENS */}

            <div>

              <h2 className="text-xl font-semibold mb-4">
                New Tokens
              </h2>

              <div className="max-h-64 overflow-y-auto space-y-2">

                {newTokens?.map((t, i) => (

                  <div
                    key={i}
                    className="border border-gray-800 p-3 rounded bg-gray-900"
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


          </div>

        </div>

      )}

    </div>

  );

}