const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otherSchema = new Schema({
  suppliers: [
    {
      supplierName: String,
      conactName: String,
      address: String,
      phone: Number,
      email: String,
      supplierTNR: String,
    },
  ],
  admin: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
});

module.exports = mongoose.model("Other", otherSchema);
