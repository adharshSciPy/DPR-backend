const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  // purchase: { type: Schema.Types.ObjectId, ref: "Purchase", required: true },
  item: { type: Schema.Types.ObjectId, ref: "Items" },
  location: String,
  stockQuatity: Number,
  measurableUnit: String,
  coveragePerUnit: Number,
  otherFeature: String,
  // userId: String,
});

module.exports = mongoose.model("Inventory", inventorySchema);
