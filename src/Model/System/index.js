const System = require("../Schema/System");

const createSystem = (data) => System.create(data);

const getBySystemId = async (_id) => await System.findOne({ _id });

const getAllSystemById = async (userList) => {
  const system = await System.find({ _id: { $in: userList } });
  return system ? system : null;
};

const deleteBySystemId = async (_id) => await System.deleteOne({ _id });

module.exports = {
  createSystem,
  getBySystemId,
  getAllSystemById,
  deleteBySystemId,
};
