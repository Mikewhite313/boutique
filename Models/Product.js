const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = Schema(
  {
    title: String,
    description: String,
    price: String,
    subcategory: { type: Schema.Types.ObjectId, ref: "Sub-Category" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
