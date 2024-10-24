const Admin = require("../../../Model/Admin");
const Purchase = require("../../../Model/Purchase");
const Inventory = require("../../../Model/Inventory");
const Project = require("../../../Model/Project");
const Client = require("../../../Model/Client");

const UpdateMaterialInward = async (req, res) => {
  const UserType = ["Admin", "User", "Manager"];
  if (!UserType.includes(req.type)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  let { _id, receivedQuantity, date } = req.body;

  const materialInward = await Purchase.getMaterialInwardById(_id);

  if (!materialInward) {
    return res.status(404).json({ message: "No Material Inward found" });
  }

  const inventories = await Inventory.findInventoryUserIdAndItem(
    req.admin,
    materialInward.item
  );

  if (!inventories || inventories.length === 0) {
    if (Number(receivedQuantity) === materialInward.stockQuatity) {
      const newInventory = await Inventory.createInventory({
        userId: req.admin,
        item: materialInward.item,
        location: materialInward.location,
        stockQuatity: materialInward.stockQuatity,
      });
      await Purchase.deleteInwardById(materialInward._id);
    } else if (Number(receivedQuantity) < materialInward.stockQuatity) {
      const newInventory = await Inventory.createInventory({
        userId: req.admin,
        item: materialInward.item,
        location: materialInward.location,
        stockQuatity: Number(receivedQuantity),
      });

      materialInward.stockQuatity =
        materialInward.stockQuatity - Number(receivedQuantity);
      await materialInward.save();
    } else {
      return res.status(400).json({ message: "Received Quantity is Higher" });
    }
  } else {
    const inventory = inventories[0]; // Assuming you're working with the first inventory document
    if (Number(receivedQuantity) === materialInward.stockQuatity) {
      inventories.stockQuatity += Number(receivedQuantity);
      await inventories.save();

      materialInward.stockQuatity -= Number(receivedQuantity);
      await materialInward.save();
    } else if (Number(receivedQuantity) < materialInward.stockQuatity) {
      inventories.stockQuatity += Number(receivedQuantity);
      await inventories.save();

      materialInward.stockQuatity -= Number(receivedQuantity);
      await materialInward.save();
    } else {
      return res.status(400).json({ message: "Received Quantity is Higher" });
    }
  }

  return res.send({ message: "Material Added to Inventory Successfully" });
};

module.exports = UpdateMaterialInward;
