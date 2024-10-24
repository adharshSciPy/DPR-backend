const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const systemSchema = new Schema({
  systemName: { type: String, required: true },
  activity:[{ type: Schema.Types.ObjectId, ref: "Activity" }],
  surfaceId:{ type: Schema.Types.ObjectId, ref: "Surface", required: true },
});

module.exports = mongoose.model("System", systemSchema);