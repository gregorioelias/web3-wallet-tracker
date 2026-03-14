const { ALCHEMY_URL } = require("../config/alchemy");

async function rpcRequest(method, params) {

  const response = await fetch(ALCHEMY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method,
      params,
      id: 1
    })
  });

  return response.json();
}

async function getETHBalance(address) {

  const data = await rpcRequest("eth_getBalance", [address, "latest"]);

  const wei = parseInt(data.result, 16);

  return wei / 1e18;
}

async function getTokenBalances(address) {

  const data = await rpcRequest("alchemy_getTokenBalances", [address]);

  const tokens = data.result.tokenBalances.slice(0, 5);

  const results = [];

  for (const token of tokens) {

    // 🔹 pedir metadata del token
    const meta = await rpcRequest(
      "alchemy_getTokenMetadata",
      [token.contractAddress]
    );

    const balance = token.tokenBalance;
    const decimals = meta.result.decimals || 18;

    const readableBalance =
      parseInt(balance) / Math.pow(10, decimals);

    // filtrar tokens basura
    if (!meta.result.symbol) continue;
    if (meta.result.name?.toLowerCase().includes("metaverse"))
      continue;
    if (readableBalance <= 0) continue;

    results.push({
      symbol: meta.result.symbol,
      name: meta.result.name,
      balance: readableBalance.toFixed(4)
    });

  }

  return results;
}

async function getWhaleTransfers() {

  const data = await rpcRequest(
    "alchemy_getAssetTransfers",
    [{
      fromBlock: "0x0",
      category: ["external"],
      maxCount: "0x32",
      order: "desc"
    }]
  );

  const transfers = data.result.transfers;

  const whales = transfers
    .map(t => ({
      from: t.from,
      to: t.to,
      value: parseFloat(t.value),
      hash: t.hash,
      block: t.blockNum
    }))
    .filter(t => t.value > 1)

  return whales;

}

async function getNewTokens() {

  const data = await rpcRequest(
    "alchemy_getAssetTransfers",
    [{
      fromBlock: "0x0",
      category: ["erc20"],
      maxCount: "0x14",
      order: "desc"
    }]
  );

  const transfers = data.result.transfers;

  const tokens = transfers.map(t => ({
    token: t.asset,
    contract: t.rawContract?.address
  }));

  return tokens;
}

async function getRecentTransfers(address) {

  const data = await rpcRequest(
    "alchemy_getAssetTransfers",
    [{
      fromBlock: "0x0",
      fromAddress: address,
      category: ["external", "erc20"],
      maxCount: "0xA",
      order: "desc"
    }]
  );

  const transfers = data.result.transfers;

  const results = transfers.map(t => ({
    asset: t.asset,
    value: t.value,
    to: t.to,
    hash: t.hash
  }));

  return results;
}

module.exports = {
  getETHBalance,
  getTokenBalances,
  getWhaleTransfers,
  getNewTokens,
  getRecentTransfers
};