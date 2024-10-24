const Client = require("../../../Model/Client");
const Dpr = require("../../../Model/Dpr");
const Project = require("../../../Model/Project");

const GetDpr = async (req, res) => {
  const UserType = ["Admin", "User", "Manager"];
  if (!UserType.includes(req.type)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (req.type !== "Admin") {
    const client = await Client.findClientById(req.admin);
    if (client.isBanned) {
      return res
        .status(403)
        .json({ error: { message: "You are banned by the user" } });
    }
  }
  const dprId = req.query.dprId;
  const projectId = req.query.projectId;

  if (dprId) {
    const data = await Dpr.getByDprId(dprId);
    if (!data) {
      return res.status(404).json({ message: "Dpr entry not found" });
    }

    return res.status(200).json({
      data,
      message: "Dpr entry Find Successfully",
    });
  } else {
    const project = await Project.getByProjectId(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const dprs = await Dpr.getAllDprById(projectId);

    // Grouping DPR entries by date
    const groupedData = dprs.reduce((acc, dpr) => {
      const date = dpr.date.toISOString().split("T")[0]; // Format date as 'YYYY-MM-DD'
      if (!acc[date]) {
        acc[date] = { date, activities: [] };
      }
      acc[date].activities.push({
        _id: dpr._id,
        activityId: dpr.activity._id,
        name: dpr.activity.activityName,
      });
      return acc;
    }, {});

    // Convert the grouped data object into an array
    const responseData = Object.values(groupedData);

    return res.status(200).json({ data:responseData });
  }
};

module.exports = GetDpr;
