const express = require("express");

const {
  getETHBalance,
  getTokenBalances
} = require("../services/blockchain");

const router = express.Router();

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

module.exports = router;