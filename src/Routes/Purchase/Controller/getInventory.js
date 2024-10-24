const Inventory = require("../../../Model/Inventory");

const GetInventory = async (req, res) => {
  const UserType = ["Admin", "User", "Manager"];
  if (!UserType.includes(req.type)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const inventories = await Inventory.findInventoryUserId(req.admin);

    // Ensure the response is always an array, even if no data is found
    if (!inventories) {
      return res.status(200).json({
        data: [],
        message: "Inventory Item Find Successfully",
      });
    }
    const responseData = Array.isArray(inventories)
      ? inventories
      : [inventories];

    return res.status(200).json({
      data: responseData,
      message: "Inventory Item Find Successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching inventory data" });
  }
};

module.exports = GetInventory;
