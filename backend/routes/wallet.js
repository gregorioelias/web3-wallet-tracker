const express = require("express");

const {
  getETHBalance,
  getTokenBalances,
  getWhaleTransfers,
  getNewTokens,
  getRecentTransfers
} = require("../services/blockchain");

const router = express.Router();

router.get("/whales", async (req, res) => {

  const whales = await getWhaleTransfers();

  res.json(whales);

});


router.get("/:address", async (req, res) => {

  try {

    const address = req.params.address;

    const ethBalance = await getETHBalance(address);

    const tokens = await getTokenBalances(address);

    res.json({
      address,
      ethBalance,
      tokens
    });

  } catch (error) {

    res.status(500).json({
      error: "Failed to fetch wallet"
    });

  }

});

router.get("/tokens/new", async (req, res) => {

  const tokens = await getNewTokens();

  res.json(tokens);

});

router.get("/:address/transfers", async (req, res) => {

  const address = req.params.address;

  const transfers = await getRecentTransfers(address);

  res.json(transfers);

});



module.exports = router;