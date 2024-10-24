const Admin = require("../../../Model/Admin");
const Supplier = require("../../../Model/Supplier");

const GetSupplier = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  const userId = req.query.id;

  if (userId) {
    const data = await Supplier.getBySupplierId(userId);
    if (!data) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    return res.status(200).json({
      data,
      message: "Project Find Successfully",
    });
  } else {
    // Fetch all users associated with the admin
    const data = await Supplier.getAllSupplierById(isAdmin.supplier);
    return res.status(200).json({ data });
  }
};

module.exports = GetSupplier;
