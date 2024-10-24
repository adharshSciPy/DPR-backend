const { verifyToken } = require("../../Utils/JWT");
const CreateMaterial = require("./Controller/createMaterial");
const CreateSupplier = require("./Controller/createSupplier");
const CreatePackSize = require("./Controller/createPackSize");
const CreateShade = require("./Controller/createShade");
const GetMaterial = require("./Controller/getMaterial");
const GetSupplier = require("./Controller/getSupplier");
const GetPackSize = require("./Controller/getPackSize");
const GetShade = require("./Controller/getShade");
const editMaterial = require("./Controller/editMaterial");
const UpdateSupplier = require("./Controller/updateSupplier");
const deleteMaterial = require("./Controller/deleteMaterial");
const editPackSize = require("./Controller/editPackSize");
const deletePackSize = require("./Controller/deletePackSize");
const deleteSupplier = require("./Controller/deleteSupplier");
const editShade = require("./Controller/editShade");
const deleteShade = require("./Controller/deleteShade");

const router = require("express").Router();

router.post("/create-supplier", verifyToken, CreateSupplier);
router.get("/get-suppliers/:id?", verifyToken, GetSupplier);
router.patch("/update-supplier/:supplierId", verifyToken, UpdateSupplier);
router.delete("/delete-supplier/:supplierId", verifyToken, deleteSupplier);

router.post("/create-material", verifyToken, CreateMaterial);
router.get("/get-materials/:id?", verifyToken, GetMaterial);
router.patch("/edit-material/:materialId", verifyToken, editMaterial);
router.delete("/delete-material/:materialId", verifyToken, deleteMaterial);

router.post("/create-packsize", verifyToken, CreatePackSize);
router.get("/get-packsize/:id?", verifyToken, GetPackSize);
router.patch("/edit-packsize/:packSizeId", verifyToken, editPackSize);
router.delete("/delete-packsize/:packSizeId", verifyToken, deletePackSize);

router.post("/create-shade", verifyToken, CreateShade);
router.get("/get-shade/:id?", verifyToken, GetShade);
router.patch("/edit-shade/:shadeId", verifyToken, editShade);
router.delete("/delete-shade/:shadeId", verifyToken, deleteShade);

module.exports = router;
