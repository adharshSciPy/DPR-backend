const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const elevationSchema = new Schema({
  elevationName: { type: String, required: true },
  surface:[{ type: Schema.Types.ObjectId, ref: "Surface" }],
  unitId:{ type: Schema.Types.ObjectId, ref: "Unit",required: true },
});

module.exports = mongoose.model("Elevation", elevationSchema);