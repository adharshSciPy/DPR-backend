const mongoose = require("mongoose");
const Building = require("./Building");
const Schema = mongoose.Schema;
// Building

const projectSchema = new Schema({
  name: { type: String, required: true },
  projectCode: String,
  description: String,
  location: String,
  contact: String,
  focalpointname: String,
  clientName:String,
  clientcontact: String,
  admin: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
  clients: { type: Schema.Types.ObjectId, ref: "Client" },
  manpower: [{ type: Schema.Types.ObjectId, ref: "ManPower" }],
  settings: [{ type: Schema.Types.ObjectId, ref: Building.modelName }],
  dpr: [{ type: Schema.Types.ObjectId, ref: "Dpr" }],
  inventory: [{ type: Schema.Types.ObjectId, ref: "Inventory" }],
  totalArea: { type: Number, default: 0 },
  totalAreaCompleted: { type: Number, default: 0 },
});

module.exports = mongoose.model("Project", projectSchema);
