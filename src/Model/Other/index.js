const Other = require("../Schema/Other");
const Material = require("../Schema/Material");
const mongoose = require("mongoose");

const createSupplier = async (data) => await Other.create(data);

const upateSupplier = async (id, data) =>
  await Other.findOneAndUpdate(
    { _id: id },
    { $push: { suppliers: data } }, // Corrected the update operation
    { new: true } // Option to return the updated document
  );

const createMaterial = async (data) => await Material.create(data);

const getLastMaterial = async (_id) =>
  await Material.findOne().sort({ _id: -1 });

const getByCategoryName = async (category) =>
  await Material.findOne({ category });

const findMaterialById = async (_id) => {
  const material = await Material.findById(_id);
  return material ? material : null;
};

const getAllMaterialById = async (userList) => {
  const material = await Material.find({ _id: { $in: userList } }).select(
    "-admin"
  );
  return material ? material : null;
};

const updateMaterial = async (id, category) => {
  const material = await Material.findByIdAndUpdate(
    id,
    { category },
    { new: true }
  );
  return material;
};

const deleteMaterial = async (id) => {
  const material = await Material.findByIdAndDelete(id);
  return material;
};

const findOtherByAdmin = async (admin) => await Other.findOne({ admin });
const findMaterialByAdmin = async (admin) => await Material.findOne({ admin });
const getMaterialForAll = async () => await Material.find();
const editMaterial = async (id, mid, category) =>
  Material.findOneAndUpdate(
    { _id: id, "materials._id": mid },
    { $set: { "materials.$.category": category } },
    { new: true }
  );
const editSupplier = async (
  id,
  sid,
  supplierName,
  conactName,
  address,
  phone,
  email,
  supplierTNR
) =>
  Other.findOneAndUpdate(
    { _id: id, "suppliers._id": sid },
    {
      $set: {
        "suppliers.$.supplierName": supplierName,
        "suppliers.$.conactName": conactName,
        "suppliers.$.address": address,
        "suppliers.$.phone": phone,
        "suppliers.$.email": email,
        "suppliers.$.supplierTNR": supplierTNR,
      },
    },
    { new: true }
  );

module.exports = {
  createSupplier,
  createMaterial,
  upateSupplier,
  findOtherByAdmin,
  findMaterialById,
  updateMaterial,
  deleteMaterial,
  findMaterialByAdmin,
  editMaterial,
  editSupplier,
  getByCategoryName,
  getMaterialForAll,
  getAllMaterialById,
  getLastMaterial,
};
