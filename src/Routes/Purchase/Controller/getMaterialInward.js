const Admin = require("../../../Model/Admin");
const Purchase = require("../../../Model/Purchase");
const Inventory = require("../../../Model/Inventory");
const Project = require("../../../Model/Project");
const Client = require("../../../Model/Client");

const GetMaterialInward = async (req, res) => {
  const UserType = ["Admin", "User", "Manager"];
  if (!UserType.includes(req.type)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.type === "Admin") {
    const materialInward = await Purchase.findMaterialInwardByAdmin(req.admin);
    res.send({
      message: "material inward found Successfully",
      materialInward,
    });
  } else if (req.type === "User") {
    const materialInward = await Purchase.findMaterialInwardByClient(req.admin);
    res.send({
      message: "material inward found Successfully",
      materialInward,
    });
  }
};

module.exports = GetMaterialInward;
