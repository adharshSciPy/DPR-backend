const { verifyToken } = require("../../Utils/JWT");
const ValidationMiddleware = require("../../Middleware/ValidationMiddleware");
const { systemSchema } = require("../../Utils/Validation");
const createSystem = require("./Controller/createSystem");
const GetSystem = require("./Controller/getSystem");
const DeleteSystem = require("./Controller/deleteSystem");

const router = require("express").Router();

router.post("/create-system", ValidationMiddleware(systemSchema),verifyToken, createSystem);
router.get("/get-system/:id?", verifyToken, GetSystem);
router.delete("/delete-system", verifyToken, DeleteSystem);

module.exports = router;
