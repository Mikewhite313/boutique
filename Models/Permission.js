const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PermissionSchema = Schema(
  {
    title: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);
const Permissions = mongoose.model("Permission", PermissionSchema);

module.exports = Permissions;
