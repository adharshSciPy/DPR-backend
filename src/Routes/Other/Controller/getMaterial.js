const Admin = require("../../../Model/Admin");
const Inventory = require("../../../Model/Inventory");
const Project = require("../../../Model/Project");
const Other = require("../../../Model/Other");

const GetMaterial = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  const userId = req.query.id;

  if (userId) {
    const data = await Other.findMaterialById(userId);
    if (!data) {
      return res.status(404).json({ message: "Material not found" });
    }

    return res.status(200).json({
      data,
      message: "Material Category Find Successfully",
    });
  } else {
    // Fetch all users associated with the admin
    const data = await Other.getAllMaterialById(isAdmin.materialCategory);
    return res.status(200).json({ data });
  }

  // const other = await Other.findMaterialByAdmin(req.admin);
  // let material;
  // if (other) {
  //   material = other.materials;
  // }

  // const data = material;
  // if (data) {
  //   res.send({
  //     message: "Material foundSuccessfully",
  //     data,
  //   });
  // }
  // if (!data) {
  //   res.send({
  //     data: [],
  //     message: "material not found ",
  //   });
  // }
};

module.exports = GetMaterial;
