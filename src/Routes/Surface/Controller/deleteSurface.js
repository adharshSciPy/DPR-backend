const Admin = require("../../../Model/Admin");
const Elevation = require("../../../Model/Elevation");
const Building = require("../../../Model/Building");
const Surface = require("../../../Model/Surface");
const {calculateTotalArea} = require("../../../Utils");

const DeleteSurface = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(404).json({ message: "Not Authorized" });
  }
  let { surfaceId } = req.body;

  const surface = await Surface.getBySurfaceId(surfaceId);
  if (!surface) {
    return res.status(404).json({ message: "Surface not found" });
  }

  if (surface.system.length > 0) {
    return res.status(400).json({
      message: "Surface has associated System and cannot be deleted",
    });
  }
  await Surface.deleteBySurfaceId(surfaceId);

  const elevation = await Elevation.getByElevationId(surface.elevationId);

  if (elevation) {
    elevation.surface.pull(surfaceId);
    await elevation.save();
  }

  const ele = await elevation.populate("unitId");
  console.log(ele,"value");
  
  const building = await Building.getByBuildingId(ele.unitId.buildingId);
  await calculateTotalArea(building.projectId);

  res.send({
    data: {
      surfaceId,
    },
    message: "Surface deleted successfully",
  });
};

module.exports = DeleteSurface;
