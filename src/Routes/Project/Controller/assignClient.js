const Client = require("../../../Model/Client");
const Admin = require("../../../Model/Admin");
const Project = require("../../../Model/Project");

const AssignClient = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(404).json({ message: "Not Authorized" });
  }
  const { clientId, projectId } = req.body;
  const client = await Client.findClientById(clientId);
  if (!client) return res.status(404).json({ message: "Client not found" });
  const project = await Project.getByProjectId(projectId);
  if (!project) return res.status(404).json({ message: "Project not found" });
  client.projects.push(projectId);
  project.clients=clientId;
  await client.save();
  await project.save();
  res.send({ message: "Project assigned Successfully" });
};

module.exports = AssignClient;
