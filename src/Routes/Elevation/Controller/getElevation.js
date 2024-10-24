const Unit = require("../../../Model/Unit");
const Elevation = require("../../../Model/Elevation");

const GetElevation = async (req, res) => {
  const UserType = ["Admin", "User", "Manager"];
  if (!UserType.includes(req.type)) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  const unitId = req.query.id;

  const unit = await Unit.getByUnitId(unitId);
  if (!unit) {
    return res.status(404).json({ message: "Unit not found" });
  }

  const data = await Elevation.getAllElevationById(unit.elevation);
  return res.status(200).json({ data });
};

module.exports = GetElevation;
