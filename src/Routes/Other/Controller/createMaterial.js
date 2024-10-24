const Admin = require("../../../Model/Admin");
const Other = require("../../../Model/Other");

const generateMaterialCode = async () => {
  // Fetch the last added brand to find the latest brandCode
  const lastBrand = await Other.getLastMaterial();
  let nextCode = "1"; // Default starting code

  if (lastBrand && lastBrand.materialCode) {
    const lastCode = parseInt(lastBrand.materialCode); // Convert last code to an integer
    const newCode = (lastCode + 1).toString(); // Increment the code without padding
    nextCode = newCode;
  }

  return nextCode;
};
const CreateMaterial = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  let { category } = req.body;

  let exists = await Other.getByCategoryName(category);
  if (exists) {
    return res.send({ message: "Material Category Already Exist" });
  }

  const materialCode = await generateMaterialCode();

  const data = await Other.createMaterial({
    category,
    admin: req.admin,
    materialCode,
  });

  isAdmin.materialCategory.push((await data)._id);
  await isAdmin.save();

  res.send({ message: "Material Category Created", data });
};

module.exports = CreateMaterial;
