const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = Schema(
  {
    title: String,
    description: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
