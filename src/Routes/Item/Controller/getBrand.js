const Other = require("../../../Model/Other");
const Brand = require("../../../Model/Brand");
const Item = require("../../../Model/Item");
const Admin = require("../../../Model/Admin");

const GetBrands = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(404).json({ message: "Not Authorized" });
  }

  const userId = req.query.id;

  if (userId) {
    const data = await Brand.getByBrandId(userId);
    if (!data) {
      return res.status(404).json({ message: "Brand not found" });
    }

    return res.status(200).json({
      data,
      message: "Brand Find Successfully",
    });
  } else {
    // Fetch all users associated with the admin
    const data = await Brand.getAllBrandById(isAdmin.brand);
    return res.status(200).json({ data });
  }
};
module.exports = GetBrands;
