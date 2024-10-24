const Inventory = require("../../../Model/Inventory");
const Purchase = require("../../../Model/Purchase");
const Admin = require("../../../Model/Admin");

const GetPurchase = async (req, res) => {
  const admin = await Admin.findAdminById(req.admin);
  if (!admin) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const userId = req.query.id;

  if (userId) {
    const data = await Inventory.getByInventoryId(userId);
    if (!data) {
      return res.status(404).json({ message: "Purchase order not found" });
    }
    return res.status(200).json({
      data,
      message: "Purchase Order Find Successfully",
    });
  } else {
    const data = await Purchase.getAllPurchaseUserById(req.admin);
    return res.status(200).json({
      data,
      message: "Purchase Order Find Successfully",
    });
  }
};

module.exports = GetPurchase;
