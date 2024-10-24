const ValidationMiddleware = require("../../Middleware/ValidationMiddleware");
const { verifyToken } = require("../../Utils/JWT");
const { manPowerSchema } = require("../../Utils/Validation");
const CreateManPower = require("./Controller/createManpower");
const GetManPower = require("./Controller/getManPower");
const UpdateManPower = require("./Controller/updateManPower");

const router = require("express").Router();

router.post(
  "/create-manpower",
  verifyToken,
  ValidationMiddleware(manPowerSchema),
  CreateManPower
);
router.get("/get-manpower/:id?", verifyToken, GetManPower);
router.patch(
  "/update-manpower/:id?",
  verifyToken,
  ValidationMiddleware(manPowerSchema),
  UpdateManPower
);

module.exports = router;
