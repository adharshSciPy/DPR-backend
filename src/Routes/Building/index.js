const { verifyToken } = require("../../Utils/JWT");
const ValidationMiddleware = require("../../Middleware/ValidationMiddleware");
const { buildingSchema } = require("../../Utils/Validation");
const CreateBuilding = require("./Controller/createBuilding");
const GetBuilding = require("./Controller/getBuilding");
const DeleteBuilding = require("./Controller/deleteBuilding");

const router = require("express").Router();

router.post("/create-building",ValidationMiddleware(buildingSchema), verifyToken, CreateBuilding);
router.get("/get-building/:id?", verifyToken, GetBuilding);
router.delete("/delete-building", verifyToken, DeleteBuilding);

module.exports = router;