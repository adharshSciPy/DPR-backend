const Admin = require("../../../Model/Admin");
const PackSize = require("../../../Model/PackSize");

const generatePackSizeCode = async () => {
  // Fetch the last added brand to find the latest brandCode
  const lastBrand = await PackSize.getLastPackSize();
  let nextCode = "001"; // Default starting code

  if (lastBrand && lastBrand.packSizeCode) {
    const lastCode = parseInt(lastBrand.packSizeCode);
    const newCode = (lastCode + 1).toString().padStart(3, "0"); // Increment and pad with 0s
    nextCode = newCode;
  }

  return nextCode;
};

const CreatePackSize = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  let { packSize } = req.body;

  const packSizeCode = await generatePackSizeCode();

  const data = await PackSize.createPackSize({
    packSize,
    admin: req.admin,
    packSizeCode,
  });

  isAdmin.packSize.push((await data)._id);
  await isAdmin.save();

  res.send({ message: "Pack Size Created", data });
};

module.exports = CreatePackSize;
