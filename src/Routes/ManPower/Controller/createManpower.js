const Admin = require("../../../Model/Admin");
const Project = require("../../../Model/Project");
const ManPower = require("../../../Model/ManPower");

const CreateManPower = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(404).json({ message: "Not Authorized" });
  }
  let { projectId, companyName, designation, costPerDay, remarks } =
    req.body;

  const project = await Project.getByProjectId(projectId);
  if (!project) {
    return res.status(404).json({ message: "Invaild Project Id" });
  }
  const data = ManPower.createManPower({
    projectId,
    companyName,
    designation,
    costPerDay,
    remarks,
  });
  project.manpower.push((await data)._id);
  await project.save();
  res.send({
    message: "Man Power Created Successfully",
    data: {
      projectId,
      companyName,
      designation,
      costPerDay,
      remarks,
    },
  });
};

module.exports = CreateManPower;
