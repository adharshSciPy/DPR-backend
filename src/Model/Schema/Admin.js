const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }], // Referencing projects created by admin
  clients: [{ type: Schema.Types.ObjectId, ref: "Client" }],
  inventory: [{ type: Schema.Types.ObjectId, ref: "Inventory" }],
  materialCategory: [{ type: Schema.Types.ObjectId, ref: "Material" }],
  materialInward: [{ type: Schema.Types.ObjectId, ref: "MaterialInward" }],
  supplier: [{ type: Schema.Types.ObjectId, ref: "Supplier" }],
  brand: [{ type: Schema.Types.ObjectId, ref: "Brand" }],
  packSize: [{ type: Schema.Types.ObjectId, ref: "PackSize" }],
  shade: [{ type: Schema.Types.ObjectId, ref: "Shade" }],
});

module.exports = mongoose.model("Admin", adminSchema);
