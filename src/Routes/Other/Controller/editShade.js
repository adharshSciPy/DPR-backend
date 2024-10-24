const Admin = require("../../../Model/Admin");
const Shade = require("../../../Model/Shade");

const editShade = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  try {
    const { shadeId } = req.params;
    const { shade } = req.body; // You can add other fields you want to update.

    // Find the material and update the fields
    const updatedMaterial = await Shade.updateShade(shadeId, shade);

    if (!updatedMaterial) {
      return res.status(404).json({ message: "Shade not found" });
    }

    res.json({
      message: "Shade updated successfully",
      data: updatedMaterial,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating Shade", error });
  }
};

module.exports = editShade;
