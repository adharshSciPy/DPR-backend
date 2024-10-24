const Elevation = require("../Schema/Elevation");

const createElevation = (data) => Elevation.create(data);

const getByElevationId = async (_id) => await Elevation.findOne({ _id });

const getAllElevationById = async (userList) => {
  const elevation = await Elevation.find({ _id: { $in: userList } });
  return elevation ? elevation : null;
};

const deleteByElevationId = async (_id) => await Elevation.deleteOne({ _id });

module.exports = {
  createElevation,
  getByElevationId,
  getAllElevationById,
  deleteByElevationId,
};
