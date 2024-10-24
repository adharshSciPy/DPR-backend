const Admin = require("../../../Model/Admin");
const Brand = require("../../../Model/Brand");

const editBrand = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  try {
    const { brandId } = req.params;
    const { brand } = req.body; // You can add other fields you want to update.

    // Find the material and update the fields
    const updatedMaterial = await Brand.updateBrand(brandId, brand);

    if (!updatedMaterial) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.json({
      message: "Brand updated successfully",
      data: updatedMaterial,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating brand", error });
  }
};

module.exports = editBrand;
