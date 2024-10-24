const Inventory = require("../Schema/Inventory");

const createInventory = async (data) => await Inventory.create(data);

const getByInventoryId = async (_id) => await Inventory.findById(_id);

const findInventoryUserId = async (userId) =>
  await Inventory.findOne({ userId }).populate("item");

const findInventoryUserIdAndItem = async (userId, item) =>
  await Inventory.findOne({ userId, item });

const getAllInventory = async () => await Inventory.find({});

const findInventoryLoc = async (location, item) =>
  await Inventory.findOne({ location, item });

const findInventoryByItem = async (item) => await Inventory.findOne({ item });

const decrementStockByItemId = async (itemId, usage) => {
  return await Inventory.updateOne(
    { item: itemId },
    { $inc: { stockQuatity: -usage } }
  );
};

const findInventoryByLoc = async (location) =>
  await Inventory.findOne({ location });

const getAllInventoryUserById = async (userList) => {
  const project = await Inventory.find({ _id: { $in: userList } });
  return project ? project : null;
};

const updateByInventoryId = async (inventoryId, data) =>
  await Inventory.findOneAndUpdate(
    { _id: inventoryId },
    { $set: data },
    { new: true }
  );

const deleteByInventoryId = async (_id) => await Inventory.deleteOne({ _id });

module.exports = {
  createInventory,
  getByInventoryId,
  getAllInventory,
  getAllInventoryUserById,
  updateByInventoryId,
  deleteByInventoryId,
  findInventoryLoc,
  findInventoryByLoc,
  findInventoryByItem,
  findInventoryUserId,
  decrementStockByItemId,
  findInventoryUserIdAndItem,
};
