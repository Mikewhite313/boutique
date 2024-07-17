const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subcategorySchema = Schema(
  {
    title: String,
    description: String,
    category: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const SubCategory = mongoose.model("SubCategory", subcategorySchema);

module.exports = SubCategory;
