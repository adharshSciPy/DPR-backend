const Project = require("../../../Model/Project");

const GetProject = async (req, res) => {
  const UserType = ["Admin", "User", "Manager"];
  if (!UserType.includes(req.type)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const projectId = req.query.id;
  const data = await Project.getProjectSettings(projectId);
  return await res.status(200).json({ data });
};

module.exports = GetProject;
