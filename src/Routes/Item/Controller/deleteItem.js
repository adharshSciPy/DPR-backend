const Admin = require("../../../Model/Admin");
const Item = require("../../../Model/Item");

const deleteItem = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  try {
    const { itemId } = req.params;

    // Find and delete the material
    const deletedMaterial = await Item.deleteItem(itemId);

    if (!deletedMaterial) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Item", error });
  }
};

module.exports = deleteItem;
