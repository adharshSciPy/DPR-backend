const Admin = require("../Schema/Admin");

const createAdmin = (data) => Admin.create(data);

const getByUsername = async (username) => await Admin.findOne({ username });

const findAdminById = async (id) => {
  const admin = await Admin.findById(id);
  return admin ? admin : null;
};

const findAllAdmin = async () => {
  const admin = await Admin.find();
  return admin ? admin : null;
};

module.exports = { createAdmin, getByUsername, findAdminById, findAllAdmin };
