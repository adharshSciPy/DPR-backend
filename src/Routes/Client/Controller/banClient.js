const Admin = require("../../../Model/Admin");
const Client = require("../../../Model/Client");

const BanClient = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(404).json({ message: "Not Authorized" });
  }
  const { clientId } = req.body;
  const client = await Client.findClientById(clientId);
  if (!client) return res.status(404).json({ message: "Client not found" });
  if (client.isBanned) {
    client.isBanned = false;
    await client.save();
    res.json({ message: "Client unbanned successfully" });
  } else {
    client.isBanned = true;
    await client.save();
    res.json({ message: "Client banned successfully" });
  }
};

module.exports = BanClient;
