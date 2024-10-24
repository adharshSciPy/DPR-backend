const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const itemsSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: "Material" },
  brand: { type: Schema.Types.ObjectId, ref: "Brand" },
  supplier: { type: Schema.Types.ObjectId, ref: "Supplier" },
  packSize: { type: Schema.Types.ObjectId, ref: "PackSize" },
  shade: { type: Schema.Types.ObjectId, ref: "Shade" },
  productName: String,
  productDescription: String,
  price: Number,
  coveragePerUnit: Number,
  productCode: String,
  otherFeatures: String,
});

module.exports = mongoose.model("Items", itemsSchema);
