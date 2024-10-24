const Project = require("../../../Model/Project");
const Admin = require("../../../Model/Admin");

const GetProject = async (req, res) => {
  const admin = await Admin.findAdminById(req.admin);
  if (!admin) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const userId = req.query.id;

  if (userId) {
    // Fetch specific user by ID
    if (!admin.projects.includes(userId)) {
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
    // Fetch all users associated with the admin
    const data = await Project.getAllProjectById(admin.projects);
    // const data = await Project.find({ _id: { $in: admin.projects } }).select('-admin -clients');
    return res.status(200).json({ data });
  }
};

module.exports = GetProject;
