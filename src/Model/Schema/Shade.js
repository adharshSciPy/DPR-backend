const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shadeSchema = new Schema({
  shade: String,
  admin: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
  shadeCode: String,
});

module.exports = mongoose.model("Shade", shadeSchema);
