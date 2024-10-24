const Admin = require("../../../Model/Admin");
const Unit = require("../../../Model/Unit");
const Elevation = require("../../../Model/Elevation");

const CreateUnit = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(404).json({ message: "Not Authorized" });
  }
  let { unitId, elevationName } = req.body;

  const unit = await Unit.getByUnitId(unitId);
  if (!unit) {
    return res.status(404).json({ message: "Invaild Unit Id" });
  }

  const data = Elevation.createElevation({
    unitId,
    elevationName,
  });

  unit.elevation.push((await data)._id);
  await unit.save();
  res.send({
    message: "Elevation Added Successfully",
    data: {
        unitId,
        elevationName,
    },
  });
};

module.exports = CreateUnit;
