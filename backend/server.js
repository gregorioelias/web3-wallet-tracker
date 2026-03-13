const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/wallet/:address", async (req, res) => {

  const address = req.params.address;

  res.json({
    address,
    ethBalance: 123,
    tokens: [
      { symbol: "USDC", balance: 200 },
      { symbol: "UNI", balance: 50 }
    ]
  });

});

app.listen(4000, () => {
  console.log("API running on port 4000");
});