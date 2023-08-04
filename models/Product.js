const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  detailedDescription: String,
  availability: Number,
  category: { type: Schema.Types.ObjectId, ref: "categories" },
});
module.exports = mongoose.model("products", productSchema);
