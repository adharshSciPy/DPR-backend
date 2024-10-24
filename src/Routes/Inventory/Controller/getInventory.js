const Inventory = require("../../../Model/Inventory");
const Admin = require("../../../Model/Admin");
const Client = require("../../../Model/Client");

const GetInventory = async (req, res) => {
  const UserType = ["Admin", "User", "Manager"];
  if (!UserType.includes(req.type)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const inventoryId = req.query.id;
  if (inventoryId) {
    const data = await Inventory.getByInventoryId(inventoryId);
    if (!data) {
      return res.status(404).json({ message: "Inventory Item not found" });
    }
    return res.status(200).json({
      data: data !== null ? data : [],
      message: "Inventory Item Find Successfully",
    });
  } else if (req.type === "Admin") {
    const admin = await Admin.findAdminById(req.admin);
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // const data = await Inventory.getAllInventoryUserById(admin.inventory);
    const data = await Inventory.findInventoryByLoc(admin.projects);
    return res.status(200).json({
      data: data !== null ? data : [],
      message: "Inventory Item Find Successfully",
    });
  } else if (req.type === "User") {
    const client = await Client.findClientById(req.admin);
    if (!client) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const data = await Inventory.getAllInventoryUserById(client.inventory);
    return res.status(200).json({
      data: data !== null ? data : [],
      message: "Inventory Item Find Successfully",
    });
  }
};

module.exports = GetInventory;
