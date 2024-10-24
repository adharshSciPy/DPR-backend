const Admin = require("../../../Model/Admin");
const Shade = require("../../../Model/Shade");

const GetShade = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  const userId = req.query.id;

  if (userId) {
    const data = await Shade.getByShadeId(userId);
    if (!data) {
      return res.status(404).json({ message: "Pack Size not found" });
    }

    return res.status(200).json({
      data,
      message: "Project Find Successfully",
    });
  } else {
    // Fetch all users associated with the admin
    const data = await Shade.getAllShadeById(isAdmin.shade);
    return res.status(200).json({ data });
  }
};

module.exports = GetShade;
