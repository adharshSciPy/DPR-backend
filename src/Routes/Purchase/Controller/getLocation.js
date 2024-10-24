const Admin = require("../../../Model/Admin");
const Project = require("../../../Model/Project");

const CreateMaterialOutward = async (req, res) => {
  const project = await Project.findAllProjects();
  const admin = await Admin.findAllAdmin();

  const projectLocation = project.map((data) => {
    return { location: data.name, id: data._id };
  });

  const AdminLocation = admin.map((data) => {
    return { location: "Central Inventory", id: data._id };
  });

  const location = AdminLocation.concat(projectLocation);

  return res.status(200).json({ data: location });
};

module.exports = CreateMaterialOutward;
