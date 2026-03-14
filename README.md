# Web3 Wallet Tracker

A full-stack Web3 analytics dashboard that allows users to inspect Ethereum wallets and on-chain activity.

## Stack

Frontend

* Next.js
* React
* TailwindCSS

Backend

* Node.js
* Express

Blockchain

* Ethereum JSON-RPC
* Alchemy API

---

# Features

✔ Fetch ETH wallet balance
✔ Retrieve ERC-20 token balances
✔ Convert token balances using decimals
✔ Display recent wallet transfers
✔ Detect large "whale" transactions on Ethereum
✔ Discover newly active tokens

---

# Architecture

Next.js frontend
↓
Node.js API
↓
Alchemy JSON-RPC
↓
Ethereum Blockchain

---

# Preview

![Web3 Wallet Tracker](./screenshot.png)

---

# Running the project

## 1. Clone the repository

```
git clone https://github.com/YOUR_USERNAME/web3-wallet-tracker.git
cd web3-wallet-tracker
```

---

## 2. Backend setup

```
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```
ALCHEMY_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
```

Start the backend:

```
node server.js
```

The API will run at:

```
http://localhost:4000
```

---

## 3. Frontend setup

Open another terminal:

```
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

---

# Example

Search a wallet address:

```
0x742d35Cc6634C0532925a3b844Bc454e4438f44e
```

The dashboard will display:

* ETH balance
* ERC-20 tokens
* Recent transfers
* Whale activity
* Newly detected tokens
