const Project = require("../../../Model/Project");
const Admin = require("../../../Model/Admin");
const Client = require("../../../Model/Client");

const UpdateDocument = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(404).json({ message: "Not Authorized" });
  }
  const projectId = req.query.id;
  let {
    name,
    description,
    projectCode,
    location,
    contact,
    focalpointname,
    clientcontact,
    clients,
  } = req.body;
  const client = await Client.findClientById(clients);
  if (!client) return res.status(404).json({ message: "Client not found" });

  const updatedProject = await Project.updateByProjectId(projectId, {
    name,
    description,
    projectCode,
    location,
    contact,
    focalpointname,
    clientcontact,
    clients,
  });

  if (!updatedProject) {
    return res.status(404).json({ message: "Project not found" });
  }

  res.send({
    message: "Project Updated",
    data: {
      name: updatedProject.name,
      description: updatedProject.description,
      location: updatedProject.location,
      contact: updatedProject.contact,
      focalpointname: updatedProject.focalpointname,
      clients: updatedProject.clients ? updatedProject.clients.username : null,
      clientcontact: updatedProject.clientcontact,
    },
  });
};

module.exports = UpdateDocument;
