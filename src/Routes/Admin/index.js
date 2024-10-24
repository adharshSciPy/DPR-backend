const ValidationMiddleware = require("../../Middleware/ValidationMiddleware");
const { loginSchema } = require("../../Utils/Validation");
const Login = require("./Controller/login");
const Signup = require("./Controller/signup");

const router = require("express").Router();

router.post("/login", ValidationMiddleware(loginSchema), Login);
router.post("/signup", Signup);

module.exports = router;
