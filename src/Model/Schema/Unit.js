const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const unitSchema = new Schema({
  unitName: { type: String, required: true },
  elevation:[{ type: Schema.Types.ObjectId, ref: "Elevation" }],
  buildingId:{ type: Schema.Types.ObjectId, ref: "Building",required: true },
});

module.exports = mongoose.model("Unit", unitSchema);