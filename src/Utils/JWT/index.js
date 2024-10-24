const jwt = require("jsonwebtoken");
const generateToken = (id, type) => {
  const token = jwt.sign({ id, type }, "my_secret_key");
  return token;
};

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, "my_secret_key");
    req.admin = decoded.id;
    req.type = decoded.type;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = { generateToken, verifyToken };
