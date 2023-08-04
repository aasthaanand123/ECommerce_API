const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  items: { type: Array, ref: "products" },
  date: { type: Date, default: Date.now },
});
module.exports = mongoose.model("orders", orderSchema);
