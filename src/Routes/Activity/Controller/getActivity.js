const System = require("../../../Model/System");
const Activity = require("../../../Model/Activity");

const GetActivity = async (req, res) => {
  const UserType = ["Admin", "User", "Manager"];
  if (!UserType.includes(req.type)) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  const systemId = req.query.id;

  const system = await System.getBySystemId(systemId);
  if (!system) {
    return res.status(404).json({ message: "System not found" });
  }

  const data = await Activity.getAllActivityById(system.activity);
  return res.status(200).json({ data });
};

module.exports = GetActivity;
