const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const surfaceSchema = new Schema({
  surfaceName: { type: String, required: true },
  area: Number,
  system:[{ type: Schema.Types.ObjectId, ref: "System" }],
  elevationId:{ type: Schema.Types.ObjectId, ref: "Elevation", required: true },
});

module.exports = mongoose.model("Surface", surfaceSchema);
