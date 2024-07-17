const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    name: String,
    email: String,
    password: String,
    code: Number,
    verified_at: Date,
    status: { type: Boolean, default: false, enum: [true, false] },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
