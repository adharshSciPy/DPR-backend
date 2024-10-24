const Building = require("../Schema/Building");

const createBuilding = (data) => Building.create(data);

const getByBuildingId = async (_id) => await Building.findById(_id);

const getAllBuildingById = async (userList) => {
  const building = await Building.find({ _id: { $in: userList } });
  return building ? building : null;
};

const deleteByBuildingId = async (_id) => await Building.deleteOne({ _id });

module.exports = {
  createBuilding,
  getByBuildingId,
  getAllBuildingById,
  deleteByBuildingId,
};
