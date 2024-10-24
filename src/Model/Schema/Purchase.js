const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
  location: String,
  stockQuatity: Number,
  measurableUnit: String,

  otherFeature: String,
  userId: String,
  item: { type: Schema.Types.ObjectId, ref: "Items" },
});

module.exports = mongoose.model("Purchase", purchaseSchema);
