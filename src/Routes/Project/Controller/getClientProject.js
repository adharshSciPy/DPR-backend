const Project = require("../../../Model/Project");
const Client = require("../../../Model/Client");

const GetClientProject = async (req, res) => {
  const client = await Client.findClientById(req.admin);
  if (!client) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  if (client.isBanned) {
    return res
      .status(403)
      .json({ error: { message: "You are banned by the user" } });
  }

  const userId = req.query.id;

  if (userId) {
    // Fetch specific user by ID
    if (!client.projects.includes(userId)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const data = await Project.getByProjectId(userId);
    if (!data) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json({
      data,
      message: "Project Find Successfully",
    });
  } else {
    // Fetch all users associated with the client
    const data = await Project.getAllProjectById(client.projects);
    return res.status(200).json({ data });
  }
};

module.exports = GetClientProject;
