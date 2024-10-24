const Admin = require("../../../Model/Admin");
const PackSize = require("../../../Model/PackSize");

const editPackSize = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  try {
    const { packSizeId } = req.params;
    const { packSize } = req.body; // You can add other fields you want to update.

    // Find the material and update the fields
    const updatedMaterial = await PackSize.updatePackSize(packSizeId, packSize);

    if (!updatedMaterial) {
      return res.status(404).json({ message: "Pack Size not found" });
    }

    res.json({
      message: "Pack Size updated successfully",
      data: updatedMaterial,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating pack size", error });
  }
};

module.exports = editPackSize;
