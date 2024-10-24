const { verifyToken } = require("../../Utils/JWT");
const ValidationMiddleware = require("../../Middleware/ValidationMiddleware");
const { unitSchema } = require("../../Utils/Validation");
const CreateUnit = require("./Controller/createUnit");
const GetUnit = require("./Controller/getUnit");
const DeleteUnit = require("./Controller/deleteUnit");

const router = require("express").Router();

router.post("/create-unit",ValidationMiddleware(unitSchema), verifyToken, CreateUnit);
router.get("/get-unit/:id?", verifyToken, GetUnit);
router.delete("/delete-unit", verifyToken, DeleteUnit);

module.exports = router;