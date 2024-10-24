const Admin = require("../../../Model/Admin");
const Project = require("../../../Model/Project");
const ManPower = require("../../../Model/ManPower");

const UpdateManPower = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(404).json({ message: "Not Authorized" });
  }
  const id = req.query.id;

  let { projectId, companyName, designation, costPerDay, remarks } = req.body;

  const updateManPower = await ManPower.updateByManPowerId(id, {
    projectId,
    companyName,
    designation,
    costPerDay,
    remarks,
  });

  if (!updateManPower) {
    return res.status(404).json({ message: "ManPower Details not found" });
  }

  res.send({
    message: "Man Power Updated",
    data: {
      projectId: updateManPower.projectId,
      companyName: updateManPower.companyName,
      designation: updateManPower.designation,
      costPerDay: updateManPower.costPerDay,
      remarks: updateManPower.remarks,
    },
  });
};

module.exports = UpdateManPower;
