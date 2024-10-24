const Project = require("../../../Model/Project");
const Building = require("../../../Model/Building");

const GetBuilding = async (req, res) => {
  const UserType = ["Admin", "User", "Manager"];
  if (!UserType.includes(req.type)) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  const projectId = req.query.id;
  const project = await Project.getByProjectId(projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const data = await Building.getAllBuildingById(project.settings);
  return res.status(200).json({ data });
};

module.exports = GetBuilding;
