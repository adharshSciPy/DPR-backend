const Brand = require("../Schema/Brand");

const createBrand = (data) => Brand.create(data);

const getByBrandId = async (_id) => await Brand.findOne({ _id });

const getAllBrandById = async (userList) => {
  const system = await Brand.find({ _id: { $in: userList } });
  return system ? system : null;
};

const getLastBrand = async (_id) => await Brand.findOne().sort({ _id: -1 });

const updateBrand = async (id, brand) => {
  const material = await Brand.findByIdAndUpdate(id, { brand }, { new: true });
  return material;
};

const deleteBrand = async (id) => {
  const material = await Brand.findByIdAndDelete(id);
  return material;
};

module.exports = {
  createBrand,
  getByBrandId,
  getAllBrandById,
  getLastBrand,
  updateBrand,
  deleteBrand,
};
