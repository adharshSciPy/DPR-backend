const Admin = require("../../../Model/Admin");
const Surface = require("../../../Model/Surface");
const System = require("../../../Model/System");
const Building = require("../../../Model/Building");
const { calculateTotalArea } = require("../../../Utils");

const CreateSystem = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(404).json({ message: "Not Authorized" });
  }
  let { surfaceId, systemName } = req.body;

  const surface = await Surface.getBySurfaceId(surfaceId);
  if (!surface) {
    return res.status(404).json({ message: "Invaild Surface Id" });
  }

  const data = System.createSystem({
    surfaceId,
    systemName,
  });

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

  surface.system.push((await data)._id);
  await surface.save();
  res.send({
    message: "System Added Successfully",
    data: {
      surfaceId,
      systemName,
    },
  });
};

module.exports = CreateSystem;
