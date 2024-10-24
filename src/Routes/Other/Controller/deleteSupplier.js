const Admin = require("../../../Model/Admin");
const Supplier = require("../../../Model/Supplier");

const deleteSupplier = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  try {
    const { supplierId } = req.params; // Extract supplierId from the request parameters

    // Find the supplier by ID and delete it
    const deletedSupplier = await Supplier.deleteSupplier(supplierId);

    // If the supplier is not found, return a 404 error
    if (!deletedSupplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    // Send back a success message
    res.json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting supplier", error });
  }
};

module.exports = deleteSupplier;
