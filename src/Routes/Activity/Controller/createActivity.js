const Admin = require("../../../Model/Admin");
const System = require("../../../Model/System");
const Activity = require("../../../Model/Activity");
const Building = require("../../../Model/Building");
const { calculateTotalArea } = require("../../../Utils");

const CreateActivity = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(404).json({ message: "Not Authorized" });
  }
  let { systemId, activityName, manPowerperDay } = req.body;

  const system = await System.getBySystemId(systemId);
  if (!system) {
    return res.status(404).json({ message: "Invaild System Id" });
  }

  const data = Activity.createActivity({
    systemId,
    activityName,
    manPowerperDay,
  });

  system.activity.push((await data)._id);
  await system.save();

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
    message: "Activity Added Successfully",
    data: {
      systemId,
      activityName,
      manPowerperDay,
    },
  });
};

module.exports = CreateActivity;
