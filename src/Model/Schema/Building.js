const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const buildingSchema = new Schema({
  buildingName: { type: String, required: true },
  unit:[{ type: Schema.Types.ObjectId, ref: "Unit" }],
  projectId: { type: Schema.Types.ObjectId, ref: "Project",required: true },
});

module.exports = mongoose.model("Building", buildingSchema);