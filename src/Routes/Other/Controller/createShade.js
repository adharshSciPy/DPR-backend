const Admin = require("../../../Model/Admin");
const Shade = require("../../../Model/Shade");

const generateShadeCode = async () => {
  // Fetch the last added brand to find the latest brandCode
  const lastBrand = await Shade.getLastShade();
  let nextCode = "001"; // Default starting code

  if (lastBrand && lastBrand.shadeCode) {
    const lastCode = parseInt(lastBrand.shadeCode);
    const newCode = (lastCode + 1).toString().padStart(3, "0"); // Increment and pad with 0s
    nextCode = newCode;
  }

  return nextCode;
};

const CreateShade = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  let { shade } = req.body;

  const shadeCode = await generateShadeCode();

  const data = await Shade.createShade({
    shade,
    admin: req.admin,
    shadeCode,
  });

  isAdmin.shade.push((await data)._id);
  await isAdmin.save();

  res.send({ message: "Pack Size Created", data });
};

module.exports = CreateShade;
