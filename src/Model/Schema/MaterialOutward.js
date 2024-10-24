const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const materialSchema = new Schema({
  location: String,
  quantity: Number,
  item: { type: Schema.Types.ObjectId, ref: "Items" },
  inventoryId: String,
  userId: { type: Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model("MaterialOut", materialSchema);
