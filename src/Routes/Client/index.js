const { verifyToken } = require("../../Utils/JWT");
const ValidationMiddleware = require("../../Middleware/ValidationMiddleware");
const { createUserSchema } = require("../../Utils/Validation");
const Login = require("./Controller/login");
const CreateClient = require("./Controller/createClient");
const BanClient = require("./Controller/banClient");
const GetClient = require("./Controller/getClient");

const router = require("express").Router();

router.post("/login", Login);
router.post(
  "/create-client",
  verifyToken,
  ValidationMiddleware(createUserSchema),
  CreateClient
);
router.get("/get-client", verifyToken, GetClient);
router.post("/ban-client", verifyToken, BanClient);

module.exports = router;
