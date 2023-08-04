const mongoose = require("mongoose");
const { Schema } = mongoose;
const cartSchema = new Schema({
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "products" },
      quantity: Number,
    },
  ],
});
module.exports = mongoose.model("carts", cartSchema);
