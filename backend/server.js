const express = require("express");
const cors = require("cors");

const walletRoutes = require("./routes/wallet");

const app = express();

app.use(cors());

app.use("/wallet", walletRoutes);

app.listen(4000, () => {
  console.log("API running on port 4000");
});