const Admin = require("../../../Model/Admin");
const Other = require("../../../Model/Other");

const deleteMaterial = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  try {
    const { materialId } = req.params;

    // Find and delete the material
    const deletedMaterial = await Other.deleteMaterial(materialId);

    if (!deletedMaterial) {
      return res.status(404).json({ message: "Material not found" });
    }

    res.json({ message: "Material deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting material", error });
  }
};
module.exports = deleteMaterial;
