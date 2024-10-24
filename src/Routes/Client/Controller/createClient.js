const Admin = require("../../../Model/Admin");
const Client = require("../../../Model/Client");
const { hashPassword } = require("../../../Utils/Bcrypt");

const CreateClient = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(404).json({ message: "Not Authorized" });
  }
  let username = req.body.username;
  let role = req.body.role;
  //   console.log(req.body.username, "Username in body");
  let exists = await Client.getByUsername(username);
  if (exists) {
    return res.send({ message: "User Already Exist" });
  }
  let password = await hashPassword(req.body.password);
  const data = await Client.createClient({
    username,
    password,
    role,
    admin: req.admin,
  });
  isAdmin.clients.push((await data)._id);
  await isAdmin.save();
  res.send({ message: "User Created", data: { username } });
};

module.exports = CreateClient;
