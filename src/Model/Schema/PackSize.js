const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packSizeSchema = new Schema({
  packSize: String,
  admin: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
  packSizeCode: String,
});

module.exports = mongoose.model("PackSize", packSizeSchema);
