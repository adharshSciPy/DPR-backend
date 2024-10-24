const Activity = require("../Schema/Activity");

const createActivity = (data) => Activity.create(data);

const getByActivityId = async (_id) => await Activity.findById(_id);

const getAllActivityById = async (userList) => {
  const activity = await Activity.find({ _id: { $in: userList } });
  return activity ? activity : null;
};

const deleteByActivityId = async (_id) => await Activity.deleteOne({ _id });

const updateByActivityId = async (activityId, data) =>
  await Activity.findByIdAndUpdate(activityId, { $set: data }, { new: true });

module.exports = {
  createActivity,
  getByActivityId,
  getAllActivityById,
  deleteByActivityId,
  updateByActivityId,
};
