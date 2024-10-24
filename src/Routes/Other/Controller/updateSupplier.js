const Admin = require("../../../Model/Admin");
const Supplier = require("../../../Model/Supplier");

const UpdateSupplier = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(401).json({ message: "Not Authorized" });
  }
  try {
    const { supplierId } = req.params; // Extract supplierId from the request parameters
    const { supplierName, contactName, address, phone, email, supplierTNR } =
      req.body;

    // Find the supplier by ID and update the fields
    const updatedSupplier = await Supplier.updateSupplier(
      supplierId, // The ID of the supplier to update
      {
        supplierName,
        contactName,
        address,
        phone,
        email,
        supplierTNR,
      }
    );

    // If the supplier is not found, return a 404 error
    if (!updatedSupplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    // Send back the updated supplier details
    res.json({
      message: "Supplier updated successfully",
      data: updatedSupplier,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating supplier", error });
  }
};

module.exports = UpdateSupplier;
