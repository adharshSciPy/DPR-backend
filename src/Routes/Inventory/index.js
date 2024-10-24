const { verifyToken } = require("../../Utils/JWT");
const GetInventory = require("./Controller/getInventory");

const router = require("express").Router();

router.get("/get-inventory", verifyToken,GetInventory);



module.exports = router;