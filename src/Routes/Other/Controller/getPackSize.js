const Admin = require("../../../Model/Admin");
const PackSize = require("../../../Model/PackSize");

const GetPackSize = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  const userId = req.query.id;

  if (userId) {
    const data = await PackSize.getByPackSizeId(userId);
    if (!data) {
      return res.status(404).json({ message: "Pack Size not found" });
    }

    return res.status(200).json({
      data,
      message: "Project Find Successfully",
    });
  } else {
    // Fetch all users associated with the admin
    const data = await PackSize.getAllPackSizeById(isAdmin.packSize);
    return res.status(200).json({ data });
  }
};

module.exports = GetPackSize;
