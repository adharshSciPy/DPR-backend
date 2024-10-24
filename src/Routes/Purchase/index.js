const { verifyToken } = require("../../Utils/JWT");
const CreateMaterialOutward = require("./Controller/createMaterialOutward");
const CreatePurchase = require("./Controller/createPurchase");
const GetMaterialInward = require("./Controller/getMaterialInward");
const GetMaterialOutward = require("./Controller/getMaterialOutward");
const GetPurchase = require("./Controller/getPurchase");
const GetInventory = require("./Controller/getInventory");
const UpdateMaterialInward = require("./Controller/updateMaterialInward");
const GetLocation = require("./Controller/getLocation");

const router = require("express").Router();

router.post("/create-purchase", verifyToken, CreatePurchase);
router.get("/get-purchase/:id?", verifyToken, GetPurchase);
router.post("/accept-material-inward", verifyToken, UpdateMaterialInward);
router.post("/create-material-outward", verifyToken, CreateMaterialOutward);
router.get("/get-material-inward", verifyToken, GetMaterialInward);
router.get("/get-material-outward", verifyToken, GetMaterialOutward);
router.get("/get-inventory", verifyToken, GetInventory);
router.get("/get-location", verifyToken, GetLocation);

module.exports = router;
