const { verifyToken } = require("../../Utils/JWT");
const ValidationMiddleware = require("../../Middleware/ValidationMiddleware");
const { elevationSchema } = require("../../Utils/Validation");
const createElevation = require("./Controller/createElevation");
const GetElevation = require("./Controller/getElevation");
const DeleteElevation = require("./Controller/deleteElevation");

const router = require("express").Router();

router.post("/create-elevation",ValidationMiddleware(elevationSchema), verifyToken, createElevation);
router.get("/get-elevation/:id?", verifyToken, GetElevation);
router.delete("/delete-elevation", verifyToken, DeleteElevation);

module.exports = router;
