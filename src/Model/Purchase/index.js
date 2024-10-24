const MaterialInward = require("../Schema/MaterialInward");
const MaterialOutward = require("../Schema/MaterialOutward");
const Purchase = require("../Schema/Purchase");

const createPurchase = async (data) => await Purchase.create(data);

const createMaterialInward = async (data) => await MaterialInward.create(data);

const createMaterialOutward = async (data) =>
  await MaterialOutward.create(data);

const getMaterialInward = async (location) =>
  await MaterialInward.find(location);

const getMaterialInwardById = async (_id) => await MaterialInward.findById(_id);

const deleteInwardById = async (_id) => await MaterialInward.deleteOne({ _id });

const updateMaterialInward = async (_id, receivedQuantity, date) => {
  // Find the document first
  let material = await MaterialInward.findById(_id);

  // Calculate the new quantity
  const newQuantity = material.quantity - receivedQuantity;

  // Update the document
  return await MaterialInward.findOneAndUpdate(
    { _id },
    {
      $push: { history: { receivedQuantity, date } },
      quantity: newQuantity,
    },
    { new: true } // This option returns the updated document
  );
};
const updatePurchase = async (_id, quantity) => {
  // Find the document first
  const purchase = await Purchase.findById(_id);

  if (!purchase) {
    throw new Error("Purchase not found");
  }

  // Calculate the new stock quantity
  const newStockQuantity = purchase.stockQuatity - quantity;

  // Update the document
  return await Purchase.findOneAndUpdate(
    { _id },
    { stockQuantity: newStockQuantity },
    { new: true } // This option returns the updated document
  );
};
const getByPurchaseId = async (_id) => await Purchase.findById(_id);

const getAllPurchaseUserById = async () => {
  const purchase = await Purchase.find().populate("item");
  return purchase ? purchase : null;
};

const updateByPurchaseId = async (purchaseId, data) =>
  await Purchase.findByIdAndUpdate(purchaseId, { $set: data }, { new: true });

const deleteByPurchaseId = async (_id) => await Purchase.deleteOne({ _id });

const findMaterialInwardByAdmin = async (admin) =>
  await MaterialInward.find({ admin }).populate("item");

const findMaterialInwardByClient = async (clients) =>
  await MaterialInward.find({ clients }).populate("item");

const findMaterialInwardByLoc = async (location) =>
  await MaterialInward.find({ location });

const findMaterialOutwardByLoc = async (location) =>
  await MaterialOutward.find({ location }).populate("item");

const findMaterialOutwardByClient = async (userId) =>
  await MaterialOutward.find({ userId }).populate("item");

module.exports = {
  createPurchase,
  getByPurchaseId,
  getAllPurchaseUserById,
  updateByPurchaseId,
  deleteByPurchaseId,
  createMaterialInward,
  getMaterialInward,
  updateMaterialInward,
  updatePurchase,
  createMaterialOutward,
  findMaterialInwardByLoc,
  findMaterialInwardByAdmin,
  findMaterialInwardByClient,
  findMaterialOutwardByLoc,
  findMaterialOutwardByClient,
  getMaterialInwardById,
  deleteInwardById,
};
