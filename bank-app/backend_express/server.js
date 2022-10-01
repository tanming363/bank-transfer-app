const express = require("express");
const app = express();
const cors = require("cors");
const transferRoutes = require("./routes/transfer");

app.use(cors());
app.options("*", cors());

app.use(express.json());

app.use("/api/transfers", transferRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log("server is running http://localhost:5000");
});
