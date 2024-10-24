const Project = require("../../../Model/Project");
const ManPower = require("../../../Model/ManPower");

const GetManPower = async (req, res) => {
  const UserType = ["Admin", "User", "Manager"];
  if (!UserType.includes(req.type)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const projectId = req.query.id;
  const project = await Project.getByProjectId(projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const data = await ManPower.getAllManPowerById(project.manpower);
  return res.status(200).json({ data });
};

module.exports = GetManPower;
