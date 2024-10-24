const Building = require("../../../Model/Building");
const Unit = require("../../../Model/Unit");

const GetUnit = async (req, res) => {
  const UserType = ["Admin", "User", "Manager"];
  if (!UserType.includes(req.type)) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  const buildingId = req.query.id;

  const building = await Building.getByBuildingId(buildingId);
  if (!building) {
    return res.status(404).json({ message: "Building not found" });
  }

  const data = await Unit.getAllUnitById(building.unit);
  return res.status(200).json({ data });
};

module.exports = GetUnit;
