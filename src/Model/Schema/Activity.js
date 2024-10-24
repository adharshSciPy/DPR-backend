const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  activityName: { type: String, required: true },
  manPowerperDay: Number,
  areaCompleted: { type: Number, default: 0 },
  systemId: { type: Schema.Types.ObjectId, ref: "System", required: true },
});

module.exports = mongoose.model("Activity", activitySchema);
