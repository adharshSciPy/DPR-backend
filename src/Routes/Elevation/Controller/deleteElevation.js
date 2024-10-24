const Admin = require("../../../Model/Admin");
const Unit = require("../../../Model/Unit");
const Elevation = require("../../../Model/Elevation");

const DeleteElevation = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(404).json({ message: "Not Authorized" });
  }
  const { elevationId } = req.body;

  const elevation = await Elevation.getByElevationId(elevationId);
  if (!elevation) {
    return res.status(404).json({ message: "Elevation not found" });
  }

  if (elevation.surface.length > 0) {
    return res.status(400).json({
      message: "Elevation has associated Surface and cannot be deleted",
    });
  }
  await Elevation.deleteByElevationId(elevationId);

  const unit = await Unit.getByUnitId(elevation.unitId);

  if (unit) {
    unit.elevation.pull(elevationId);
    await unit.save();
  }

  res.send({
    data: {
      elevationId,
    },
    message: "Elevation deleted successfully",
  });
};

module.exports = DeleteElevation;
