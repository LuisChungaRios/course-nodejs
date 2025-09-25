const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  purchaseNumber: String,
  amount: Number,
  sessionKey: String,
  status: String,
  niubizResponse: Object,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", transactionSchema);
