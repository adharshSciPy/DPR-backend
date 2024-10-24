const Shade = require("../Schema/Shade");

const createShade = (data) => Shade.create(data);

const getByShadeId = async (_id) => await Shade.findOne({ _id });

const getAllShadeById = async (userList) => {
  const system = await Shade.find({ _id: { $in: userList } });
  return system ? system : null;
};

const getLastShade = async (_id) => await Shade.findOne().sort({ _id: -1 });

const updateShade = async (id, shade) => {
  const material = await Shade.findByIdAndUpdate(id, { shade }, { new: true });
  return material;
};

const deleteShade = async (id) => {
  const material = await Shade.findByIdAndDelete(id);
  return material;
};

module.exports = {
  createShade,
  getByShadeId,
  getAllShadeById,
  getLastShade,
  updateShade,
  deleteShade,
};
