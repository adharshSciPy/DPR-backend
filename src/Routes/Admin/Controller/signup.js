const Admin = require("../../../Model/Admin");
const { hashPassword } = require("../../../Utils/Bcrypt");

const Signup = async (req, res) => {
  let username = req.body.username;
  //   console.log(req.body.username, "Username in body");
  let exists = await Admin.getByUsername(username);
  if (exists) {
    return res.send({ message: "User Already Exist" });
  }
  let password = await hashPassword(req.body.password);
  const data = await Admin.createAdmin({ username, password });
  res.send({ message: "User Created", data: { username } });
};

module.exports = Signup;
