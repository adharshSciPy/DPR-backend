const Admin = require("../../../Model/Admin");
const Building = require("../../../Model/Building");
const Unit = require("../../../Model/Unit");

const CreateUnit = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(404).json({ message: "Not Authorized" });
  }
  let { buildingId, unitName } = req.body;

  const building = await Building.getByBuildingId(buildingId);
  if (!building) {
    return res.status(404).json({ message: "Invaild Building Id" });
  }

  const data = Unit.createUnit({
    buildingId,
    unitName,
  });

  building.unit.push((await data)._id);
  await building.save();
  res.send({
    message: "Unit Added Successfully",
    data: {
      buildingId,
      unitName,
    },
  });
};

module.exports = CreateUnit;
