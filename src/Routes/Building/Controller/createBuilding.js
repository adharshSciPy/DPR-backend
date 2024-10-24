const Admin = require("../../../Model/Admin");
const Project = require("../../../Model/Project");
const Building = require("../../../Model/Building");

const CreateBuilding = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(404).json({ message: "Not Authorized" });
  }
  let { projectId, buildingName } = req.body;

  const project = await Project.getByProjectId(projectId);
  if (!project) {
    return res.status(404).json({ message: "Invaild Project Id" });
  }
  const data = Building.createBuilding({
    projectId,
    buildingName,
  });
  project.settings.push((await data)._id);
  await project.save();
  res.send({
    message: "Building Created Successfully",
    data: {
      projectId,
      buildingName,
    },
  });
};

module.exports = CreateBuilding;
