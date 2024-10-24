const Admin = require("../../../Model/Admin");
const Building = require("../../../Model/Building");
const Unit = require("../../../Model/Unit");

const DeleteUnit = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(404).json({ message: "Not Authorized" });
  }
  const { unitId } = req.body;

  const unit = await Unit.getByUnitId(unitId);
  if (!unit) {
    return res.status(404).json({ message: "Unit not found" });
  }

  if (unit.elevation.length > 0) {
    return res
      .status(400)
      .json({
        message: "Unit has associated Elevations and cannot be deleted",
      });
  }

  await Unit.deleteByUnitId(unitId);

  const building = await Building.getByBuildingId(unit.buildingId);

  if (building) {
    building.unit.pull(unitId);
    await building.save();
  }

  res.send({
    data: {
      unitId,
    },
    message: "Unit deleted successfully",
  });
};

module.exports = DeleteUnit;
