const Admin = require("../../../Model/Admin");
const System = require("../../../Model/System");
const Building = require("../../../Model/Building");
const Activity = require("../../../Model/Activity");
const { calculateTotalArea } = require("../../../Utils");

const DeleteActivity = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(404).json({ message: "Not Authorized" });
  }
  let { activityId } = req.body;

  const activity = await Activity.getByActivityId(activityId);
  if (!activity) {
    return res.status(404).json({ message: "Activity not found" });
  }
  await Activity.deleteByActivityId(activityId);

  const system = await System.getBySystemId(activity.systemId);

  if (system) {
    system.activity.pull(activityId);
    await system.save();
  }

  const ele = await system.populate({
    path: "surfaceId",
    populate: {
      path: "elevationId",
      populate: {
        path: "unitId",
      },
    },
  });
  const building = await Building.getByBuildingId(
    ele.surfaceId.elevationId.unitId.buildingId
  );
  await calculateTotalArea(building.projectId);

  res.send({
    data: {
      activityId,
    },
    message: "System deleted successfully",
  });
};

module.exports = DeleteActivity;
