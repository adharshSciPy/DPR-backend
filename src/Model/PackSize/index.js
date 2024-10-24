const PackSize = require("../Schema/PackSize");

const createPackSize = (data) => PackSize.create(data);

const getByPackSizeId = async (_id) => await PackSize.findOne({ _id });

const getAllPackSizeById = async (userList) => {
  const system = await PackSize.find({ _id: { $in: userList } });
  return system ? system : null;
};

const getLastPackSize = async (_id) =>
  await PackSize.findOne().sort({ _id: -1 });

const updatePackSize = async (id, packSize) => {
  const material = await PackSize.findByIdAndUpdate(
    id,
    { packSize },
    { new: true }
  );
  return material;
};

const deletePackSize = async (id) => {
  const material = await PackSize.findByIdAndDelete(id);
  return material;
};

module.exports = {
  createPackSize,
  getByPackSizeId,
  getAllPackSizeById,
  getLastPackSize,
  updatePackSize,
  deletePackSize,
};
