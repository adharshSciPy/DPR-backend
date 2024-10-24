const Item = require("../Schema/Items");

const createItem = (data) => Item.create(data);

const getByItemId = async (_id) => await Item.findOne({ _id });

const getAllItem = async () => {
  const item = await Item.find();
  return item ? item : null;
};

const updateItem = async (id, data) => {
  const material = await Item.findByIdAndUpdate(id, data, { new: true });
  return material;
};

const deleteItem = async (id) => {
  const material = await Item.findByIdAndDelete(id);
  return material;
};

module.exports = {
  createItem,
  getByItemId,
  getAllItem,
  updateItem,
  deleteItem,
};
