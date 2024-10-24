const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandSchema = new Schema({
  brand: String,
  admin: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
  brandCode: String,
});

module.exports = mongoose.model("Brand", brandSchema);
