const Admin = require("../../../Model/Admin");
const Building = require("../../../Model/Building");
const Project = require("../../../Model/Project");

const DeleteBuilding = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(404).json({ message: "Not Authorized" });
  }
  const { buildingId } = req.body;

  const building = await Building.getByBuildingId(buildingId);
  if (!building) {
    return res.status(404).json({ message: "Building not found" });
  }

  if (building.unit.length > 0) {
    return res
      .status(400)
      .json({ message: "Building has associated units and cannot be deleted" });
  }

  await Building.deleteByBuildingId(buildingId);

  const project = await Project.getByProjectId(building.projectId);

  if (project) {
    project.settings.pull(buildingId);
    await project.save();
  }

  res.send({
    data: {
      buildingId,
    },
    message: "Building deleted successfully",
  });
};

module.exports = DeleteBuilding;
