const { verifyToken } = require("../../Utils/JWT");
const ValidationMiddleware = require("../../Middleware/ValidationMiddleware");
const { dprEntrySchema } = require("../../Utils/Validation");
const CreateDpr = require("./Controller/createDpr");
const GetDpr = require("./Controller/getDpr");
const router = require("express").Router();

router.post("/create-dpr",ValidationMiddleware(dprEntrySchema) ,verifyToken, CreateDpr);
router.get("/get-dpr/:id?", verifyToken, GetDpr);

module.exports = router;