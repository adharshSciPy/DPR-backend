const Admin = require("../../../Model/Admin");
const Shade = require("../../../Model/Shade");

const deleteShade = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  try {
    const { shadeId } = req.params;

    // Find and delete the material
    const deletedMaterial = await Shade.deleteShade(shadeId);

    if (!deletedMaterial) {
      return res.status(404).json({ message: "Shade not found" });
    }

    res.json({ message: "Shade deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Shade", error });
  }
};

module.exports = deleteShade;
