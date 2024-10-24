const ManPower = require("../Schema/ManPower");

const createManPower = (data) => ManPower.create(data);

const getByManPowerId = async (_id) => await ManPower.findById(_id);

const getAllManPowerById = async (userList) => {
  const manpower = await ManPower.find({ _id: { $in: userList } });
  return manpower ? manpower : null;
};

const updateByManPowerId = async (projectId, data) =>
  await Project.findByIdAndUpdate(projectId, { $set: data }, { new: true });

module.exports = {
  createManPower,
  getByManPowerId,
  getAllManPowerById,
  updateByManPowerId,
};
