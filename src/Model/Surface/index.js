const Surface = require("../Schema/Surface");

const createSurface = (data) => Surface.create(data);

const getBySurfaceId = async (_id) => await Surface.findById(_id);

const getAllSurfaceById = async (userList) => {
  const surface = await Surface.find({ _id: { $in: userList } });
  return surface ? surface : null;
};

const deleteBySurfaceId = async (_id) => await Surface.deleteOne({ _id });

module.exports = {
  createSurface,
  getBySurfaceId,
  getAllSurfaceById,
  deleteBySurfaceId,
};
