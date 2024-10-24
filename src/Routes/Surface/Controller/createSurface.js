const Admin = require("../../../Model/Admin");
const Elevation = require("../../../Model/Elevation");
const Surface = require("../../../Model/Surface");
const Building = require("../../../Model/Building");
const { calculateTotalArea } = require("../../../Utils");

const CreateSurface = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(404).json({ message: "Not Authorized" });
  }
  let { elevationId, area, surfaceName } = req.body;

  const elevation = await Elevation.getByElevationId(elevationId);
  if (!elevation) {
    return res.status(404).json({ message: "Invaild Elevation Id" });
  }

  const data = Surface.createSurface({
    elevationId,
    area,
    surfaceName,
  });

  elevation.surface.push((await data)._id);
  await elevation.save();
  const ele = await elevation.populate("unitId");
  // console.log(ele, "Unit");
  const building = await Building.getByBuildingId(ele.unitId.buildingId);
  console.log(building.projectId, "Unit");

  await calculateTotalArea(building.projectId);
  res.send({
    message: "Surface Added Successfully",
    data: {
      elevationId,
      area,
      surfaceName,
    },
  });
};

module.exports = CreateSurface;
