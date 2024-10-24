const Admin = require("../../../Model/Admin");
const PackSize = require("../../../Model/PackSize");

const deletePackSize = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  try {
    const { packSizeId } = req.params;

    // Find and delete the material
    const deletedMaterial = await PackSize.deletePackSize(packSizeId);

    if (!deletedMaterial) {
      return res.status(404).json({ message: "Pack Size not found" });
    }

    res.json({ message: "Pack Size deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Pack Size", error });
  }
};
module.exports = deletePackSize;
