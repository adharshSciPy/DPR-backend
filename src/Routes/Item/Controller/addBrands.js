const Other = require("../../../Model/Other");
const Brand = require("../../../Model/Brand");
const Item = require("../../../Model/Item");
const Admin = require("../../../Model/Admin");

const generateBrandCode = async () => {
  // Fetch the last added brand to find the latest brandCode
  const lastBrand = await Brand.getLastBrand();
  let nextCode = "001"; // Default starting code

  if (lastBrand && lastBrand.brandCode) {
    const lastCode = parseInt(lastBrand.brandCode);
    const newCode = (lastCode + 1).toString().padStart(3, "0"); // Increment and pad with 0s
    nextCode = newCode;
  }

  return nextCode;
};

const AddBrands = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(404).json({ message: "Not Authorized" });
  }

  const { brand, category } = req.body;

  const isCategory = Other.findMaterialById(category);
  if (!isCategory) {
    return res.status(400).json({
      error: {
        message: "Invalid Category",
      },
    });
  }

  const brandCode = await generateBrandCode();

  const data = await Brand.createBrand({
    brand,
    category,
    admin: req.admin,
    brandCode,
  });

  isAdmin.brand.push((await data)._id);
  await isAdmin.save();

  res.send({ message: "Brand Created", data });
};
module.exports = AddBrands;
