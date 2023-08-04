const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  title: String,
  products: [{ type: Schema.Types.ObjectId, ref: "products" }],
});
module.exports = mongoose.model("categories", categorySchema);
