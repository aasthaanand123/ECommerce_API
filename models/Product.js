const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  detailedDescription: String,
  availability: Number,
  category: { type: Schema.Types.ObjectId, ref: "categories" },
  imageUrl: String,
  isApproved: { type: Boolean, default: false },
});
module.exports = mongoose.model("products", productSchema);
