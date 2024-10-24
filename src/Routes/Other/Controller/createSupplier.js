const Admin = require("../../../Model/Admin");
const Supplier = require("../../../Model/Supplier");

const generateSupplierCode = async () => {
  // Fetch the last added brand to find the latest brandCode
  const lastBrand = await Supplier.getLastSupplier();
  let nextCode = "0001"; // Default starting code

  if (lastBrand && lastBrand.supplierCode) {
    const lastCode = parseInt(lastBrand.supplierCode); // Convert last code to an integer
    const newCode = (lastCode + 1).toString().padStart(4, "0"); // Increment and pad with 0s to 4 digits
    nextCode = newCode;
  }

  console.log(nextCode, "Code");

  return nextCode;
};
const CreateSupplier = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  let { supplierName, conactName, address, phone, email, supplierTNR } =
    req.body;

  const supplierCode = await generateSupplierCode();

  const data = await Supplier.createSupplier({
    supplierName,
    conactName,
    address,
    phone,
    email,
    supplierTNR,
    admin: req.admin,
    supplierCode,
  });

  isAdmin.supplier.push((await data)._id);
  await isAdmin.save();

  res.send({ message: "Supplier Created", data });
};

module.exports = CreateSupplier;
