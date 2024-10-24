const Supplier = require("../Schema/Supplier");

const createSupplier = (data) => Supplier.create(data);

const getBySupplierId = async (_id) => await Supplier.findOne({ _id });

const getAllSupplierById = async (userList) => {
  const system = await Supplier.find({ _id: { $in: userList } });
  return system ? system : null;
};

const getLastSupplier = async (_id) =>
  await Supplier.findOne().sort({ _id: -1 });

const updateSupplier = async (id, data) => {
  const material = await Supplier.findByIdAndUpdate(id, data, { new: true });
  return material;
};

const deleteSupplier = async (id) => {
  const material = await Supplier.findByIdAndDelete(id);
  return material;
};

// const deleteBySupplierId = async (_id) => await Supplier.deleteOne({ _id });

module.exports = {
  createSupplier,
  getBySupplierId,
  getAllSupplierById,
  getLastSupplier,
  updateSupplier,
  deleteSupplier,
};
