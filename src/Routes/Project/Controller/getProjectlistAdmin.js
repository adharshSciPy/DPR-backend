const Project = require("../../../Model/Project");
const Admin = require("../../../Model/Admin");

const GetProjectList = async (req, res) => {
  const admin = await Admin.findAdminById(req.admin);
  if (!admin) {
    return res.status(403).json({ message: "Unauthorized" });
  }



    const data = await Project.getAdminProjects()
    if (!data) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json({
      data,
      message: "Project Find Successfully",
    });
  } 


module.exports = GetProjectList;
