const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roleSchema = Schema(
  {
    title: String,
    permission: { type: Schema.Types.ObjectId, ref: "Permission" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
