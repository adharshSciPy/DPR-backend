const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const manpowerSchema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  companyName: { type: String, required: true },
  designation: String,
  operativeNumber: Number,
  costPerDay: Number,
  remarks: String,
});

module.exports = mongoose.model("ManPower", manpowerSchema);
