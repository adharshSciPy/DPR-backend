const Unit = require("../Schema/Unit");

const createUnit = (data) => Unit.create(data);

const getByUnitId = async (_id) => await Unit.findOne({ _id });

const getAllUnitById = async (userList) => {
  const unit = await Unit.find({ _id: { $in: userList } });
  return unit ? unit : null;
};

const deleteByUnitId = async (_id) => await Unit.deleteOne({ _id });

module.exports = { createUnit, getByUnitId, getAllUnitById,deleteByUnitId };