const Dpr = require("../Schema/Dpr");

const createDpr = (data) => Dpr.create(data);

const getByDprId = async (_id) => await Dpr.findById(_id);

const getAllDprById = async (projectId) => {
  const dpr = await Dpr.find({ projectId: projectId }).populate("activity");
  return dpr ? dpr : null;
};

const updateDprById = async (dprId, data) =>
  await Dpr.findByIdAndUpdate(dprId, { $set: data }, { new: true });

module.exports = { createDpr, getByDprId, getAllDprById, updateDprById };
