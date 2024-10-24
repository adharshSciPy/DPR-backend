const Admin = require("../../../Model/Admin");
const Other = require("../../../Model/Other");

const editMaterial = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  try {
    const { materialId } = req.params;
    const { category } = req.body; // You can add other fields you want to update.

    // Find the material and update the fields
    const updatedMaterial = await Other.updateMaterial(materialId, category);

    if (!updatedMaterial) {
      return res.status(404).json({ message: "Material not found" });
    }

    res.json({
      message: "Material updated successfully",
      data: updatedMaterial,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating material", error });
  }
};

module.exports = editMaterial;
