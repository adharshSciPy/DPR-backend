const Admin = require("../../../Model/Admin");
const Brand = require("../../../Model/Brand");

const deleteBrand = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  try {
    const { brandId } = req.params;

    // Find and delete the material
    const deletedMaterial = await Brand.deleteBrand(brandId);

    if (!deletedMaterial) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.json({ message: "Brand deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Brand", error });
  }
};

module.exports = deleteBrand;
