const { verifyToken } = require("../../Utils/JWT");
const AddBrands = require("./Controller/addBrands");
const CreateItems = require("./Controller/createItems");
const deleteBrand = require("./Controller/deleteBrand");
const deleteItem = require("./Controller/deleteItem");
const editBrand = require("./Controller/editBrand");
const editItem = require("./Controller/editItem");
const GetBrands = require("./Controller/getBrand");
const GetItems = require("./Controller/getItems");

const router = require("express").Router();

router.post("/add-brand", verifyToken, AddBrands);
router.get("/get-brand/:id?", verifyToken, GetBrands);
router.patch("/edit-brand/:brandId", verifyToken, editBrand);
router.delete("/delete-brand/:brandId", verifyToken, deleteBrand);

router.post("/create-items", verifyToken, CreateItems);
router.get("/get-items", verifyToken, GetItems);
router.patch("/edit-item/:itemId", verifyToken, editItem);
router.delete("/delete-item/:itemId", verifyToken, deleteItem);

module.exports = router;
