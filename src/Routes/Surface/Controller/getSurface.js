const Elevation = require("../../../Model/Elevation");
const Surface = require("../../../Model/Surface");

const GetSurface = async (req, res) => {
  const UserType = ["Admin", "User", "Manager"];
  if (!UserType.includes(req.type)) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  const elevationId = req.query.id;

  const elevation = await Elevation.getByElevationId(elevationId);
  if (!elevation) {
    return res.status(404).json({ message: "Elevation not found" });
  }

  const data = await Surface.getAllSurfaceById(elevation.surface);
  return res.status(200).json({ data });
};

module.exports = GetSurface;
