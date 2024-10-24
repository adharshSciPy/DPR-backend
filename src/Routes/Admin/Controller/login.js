const Admin = require("../../../Model/Admin");
const Client = require("../../../Model/Client");
const { comparePasswords } = require("../../../Utils/Bcrypt");
const { generateToken } = require("../../../Utils/JWT");

const Login = async (req, res) => {
  let username = req.body.username;
  let admin = await Admin.getByUsername(username);
  if (!admin) {
    // return res.send({ message: "Username Not Found" });
    let user = await Client.getByUsername(username);
    if (!user) {
      return res.status(400).json({ message: "Username Not Found" });
    }
    let password = await comparePasswords(req.body.password, user.password);
    if (!password) {
      return res.status(400).json({ message: "Password Does not Match" });
    }

    if (user.isBanned)
      return res
        .status(401)
        .json({ message: "This account is banned by the Admin" });

    const token = generateToken(user.id, user.role);
    return res.send({
      message: "Login Successful",
      token,
      userType: user.role,
    });
  }
  let password = await comparePasswords(req.body.password, admin.password);
  if (!password) {
    return res.send({ message: "Password Does not Match" });
  }

  const token = generateToken(admin.id, "Admin");
  res.send({ message: "Login Successful", token, userType: "Admin" });
};

module.exports = Login;
