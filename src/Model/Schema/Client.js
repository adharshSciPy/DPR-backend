const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  isBanned: { type: Boolean, default: false },
  admin: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
});

module.exports = mongoose.model("Client", clientSchema);
