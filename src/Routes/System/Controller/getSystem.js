const Surface = require("../../../Model/Surface");
const System = require("../../../Model/System");

const GetSystem = async (req, res) => {
  const UserType = ["Admin", "User", "Manager"];
  if (!UserType.includes(req.type)) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  const surfaceId = req.query.id;

  const surface = await Surface.getBySurfaceId(surfaceId);
  if (!surface) {
    return res.status(404).json({ message: "Surface not found" });
  }

  const data = await System.getAllSystemById(surface.system);
  return res.status(200).json({ data });
};

module.exports = GetSystem;
