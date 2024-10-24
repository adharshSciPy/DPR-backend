const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const materialSchema = new Schema({
  category: String,
  admin: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
  materialCode: String,
});

module.exports = mongoose.model("Material", materialSchema);
