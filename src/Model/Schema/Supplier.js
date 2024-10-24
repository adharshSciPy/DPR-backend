const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
  supplierName: String,
  conactName: String,
  address: String,
  phone: String,
  email: String,
  supplierTNR: String,
  admin: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
  supplierCode: String,
});

module.exports = mongoose.model("Supplier", supplierSchema);
