const Client = require("../Schema/Client");

const createClient = (data) => Client.create(data);

const getByUsername = async (username,admin) => await Client.findOne({ username });

const find=async (username,admin) => {
  try {
      const clients = await Client.find(
          { username: { $regex: username, $options: 'i' } ,admin}, // Added case-insensitive option
          { username: 1, _id: 1 }
      );
      return clients;
  } catch (error) {
      console.error('Error finding clients:', error);
      throw error;
  }
};
const findClientById = async (id) => {
  const client = await Client.findById(id);
  return client ? client : null;
};

const getByClientId = async (_id) => await Client.findOne({ _id });

const   getAllClientById = async (userList) => {
  const client = await Client.find({ _id: { $in: userList } }).select('-admin -projects -password');
  return client ? client : null;
};

module.exports = {
  createClient,
  getByUsername,
  findClientById,
  getByClientId,
  getAllClientById,
  find
};
