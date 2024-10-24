const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dprSchema = new Schema({
  date: { type: Date, required: true },
  updatedOn: Date,
  projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  building: { type: Schema.Types.ObjectId, ref: "Building", required: true },
  unit: { type: Schema.Types.ObjectId, ref: "Unit", required: true },
  elevation: { type: Schema.Types.ObjectId, ref: "Elevation", required: true },
  surface: { type: Schema.Types.ObjectId, ref: "Surface", required: true },
  system: { type: Schema.Types.ObjectId, ref: "System", required: true },
  activity: { type: Schema.Types.ObjectId, ref: "Activity", required: true },
  area: Number,
  materialUsed: [
    { item: { type: Schema.Types.ObjectId, ref: "Items" }, usage: Number },
  ],
  // usage: Number,
  company: String,
  numberofOperative: Number,
});

module.exports = mongoose.model("Dpr", dprSchema);
