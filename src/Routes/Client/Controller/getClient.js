const Client = require("../../../Model/Client");
const Admin = require("../../../Model/Admin");

const GetClient = async (req, res) => {
  const admin = await Admin.findAdminById(req.admin);
  if (!admin) {
    return res.status(404).json({ message: "Unauthorized" });
  }

  const userId = req.query.id;

  if (userId) {
    // Fetch specific user by ID
    if (!admin.clients.includes(userId)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const data = await Client.getByClientId(userId);
    if (!data) {
      return res.status(404).json({ message: "Client not found" });
    }

    return res.status(200).json({
      data,
      message: "Client Find Successfully",
    });
  } else {
    // Fetch all users associated with the admin
    const data = await Client.getAllClientById(admin.clients);
    return res.status(200).json({ data });
  }
};

module.exports = GetClient;
