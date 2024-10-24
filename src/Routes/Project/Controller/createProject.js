const Project = require("../../../Model/Project");
const Admin = require("../../../Model/Admin");
const Client = require("../../../Model/Client");

const CreateDocument = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(404).json({ message: "Not Authorized" });
  }
  let {
    name,
    description,
    projectCode,
    location,
    contact,
    focalpointname,
    clientName,
    clientcontact,
    clients,
  } = req.body;
  const client = await Client.findClientById(clients)
  if (!client) return res.status(404).json({ message: "Client not found" });
  let admin = req.admin;
  const data = await Project.createProject({
    name,
    description,
    projectCode,
    admin,
    location,
    contact,
    focalpointname,
    clients,
    clientName,
    clientcontact,
  });
  isAdmin.projects.push((await data)._id);
  await isAdmin.save();
  client.projects.push((await data)._id);
  await client.save();
  res.send({
    message: "Project Created",
    data,
  });
};

module.exports = CreateDocument;
