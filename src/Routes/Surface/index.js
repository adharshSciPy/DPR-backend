const { verifyToken } = require("../../Utils/JWT");
const ValidationMiddleware = require("../../Middleware/ValidationMiddleware");
const { surfaceSchema } = require("../../Utils/Validation");
const createSurface = require("./Controller/createSurface");
const GetSurface = require("./Controller/getSurface");
const DeleteSurface = require("./Controller/deleteSurface");

const router = require("express").Router();

router.post("/create-surface",ValidationMiddleware(surfaceSchema), verifyToken, createSurface);
router.get("/get-surface/:id?", verifyToken, GetSurface);
router.delete("/delete-surface", verifyToken, DeleteSurface);

module.exports = router;