const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const materialSchema = new Schema({
  item: { type: Schema.Types.ObjectId, ref: "Items" },
  location: String,
  purchaseId: String,
  stockQuatity: Number,
  date: String,
  history: [
    {
      quantityReceived: {
        type: Number,
        default: null,
      },
      date: {
        type: String,
        default: null,
      },
    },
  ],
  // inventoryId: String,
  clients: { type: Schema.Types.ObjectId, ref: "Client" },
  admin: { type: Schema.Types.ObjectId, ref: "Admin" },
  role: String,
});

module.exports = mongoose.model("MaterialIn", materialSchema);
