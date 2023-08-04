const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  orders: [{ type: Schema.Types.ObjectId, ref: "orders" }],
  cart: { type: Schema.Types.ObjectId, ref: "carts" },
});
module.exports = mongoose.model("users", userSchema);
