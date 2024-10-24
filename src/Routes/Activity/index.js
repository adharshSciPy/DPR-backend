const { verifyToken } = require("../../Utils/JWT");
const ValidationMiddleware = require("../../Middleware/ValidationMiddleware");
const { activitySchema } = require("../../Utils/Validation");
const createActivity = require("./Controller/createActivity");
const GetActivity = require("./Controller/getActivity");
const DeleteActivity = require("./Controller/deleteActivity");

const router = require("express").Router();

router.post("/create-activity",ValidationMiddleware(activitySchema), verifyToken, createActivity);
router.get("/get-activity/:id?", verifyToken, GetActivity);
router.delete("/delete-activity", verifyToken, DeleteActivity);

module.exports = router;