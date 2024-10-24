const Admin = require("../../../Model/Admin");
const Building = require("../../../Model/Building");
const Surface = require("../../../Model/Surface");
const System = require("../../../Model/System");
const { calculateTotalArea } = require("../../../Utils");

const DeleteSystem = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(404).json({ message: "Not Authorized" });
  }
  let { systemId } = req.body;

  const system = await System.getBySystemId(systemId);
  if (!system) {
    return res.status(404).json({ message: "System not found" });
  }

  if (system.activity.length > 0) {
    return res.status(400).json({
      message: "System has associated Activity and cannot be deleted",
    });
  }
  await System.deleteBySystemId(systemId);

  const surface = await Surface.getBySurfaceId(system.surfaceId);

  if (surface) {
    surface.system.pull(systemId);
    await surface.save();
  }

  const ele = await surface.populate({
    path: "elevationId",
    populate: {
      path: "unitId",
    },
  });
  const building = await Building.getByBuildingId(
    ele.elevationId.unitId.buildingId
  );
  await calculateTotalArea(building.projectId);

  res.send({
    data: {
      systemId,
    },
    message: "System deleted successfully",
  });
};

module.exports = DeleteSystem;
