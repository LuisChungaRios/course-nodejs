const express = require("express");
const mongoose = require("mongoose");
const paymentRoutes = require("./routes/payment");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public/pages")));
app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
