const Admin = require("../../../Model/Admin");
const Purchase = require("../../../Model/Purchase");
const Inventory = require("../../../Model/Inventory");
const Project = require("../../../Model/Project");
const Client = require("../../../Model/Client");

const GetMaterialOutward = async (req, res) => {
  const UserType = ["Admin", "User", "Manager"];
  if (!UserType.includes(req.type)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const materialOutward = await Purchase.findMaterialOutwardByClient(req.admin);

  res.send({
    message: "material outward found Successfully",
    data: materialOutward,
  });
};

module.exports = GetMaterialOutward;
