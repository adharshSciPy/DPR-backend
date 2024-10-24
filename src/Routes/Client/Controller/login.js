const Client = require("../../../Model/Client");
const { comparePasswords } = require("../../../Utils/Bcrypt");
const { generateToken } = require("../../../Utils/JWT");

const Login = async (req, res) => {
  let username = req.body.username;
  let user = await Client.getByUsername(username);
  if (!user) {
    return res.send({ message: "Username Not Found" });
  }
  let password = await comparePasswords(req.body.password, user.password);
  if (!password) {
    return res.send({ message: "Password Does not Match" });
  }

  if (user.isBanned) return res.status(403).json({ message: "This account is banned by the Admin" });

  const token = generateToken(user.id, user.role);
  res.send({ message: "Login Successful", token, userType: user.role });
};

module.exports = Login;
