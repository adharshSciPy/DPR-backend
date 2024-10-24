const { verifyToken } = require("../../Utils/JWT");
const CreateProject = require("./Controller/createProject");
const GetProject = require("./Controller/getProject");
const GetClientProject = require("./Controller/getClientProject");
const GetProjectSettings = require("./Controller/getProjectSettings");
const AssignClient = require("./Controller/assignClient");
const UpdateProject = require("./Controller/updateProject");
const ValidationMiddleware = require("../../Middleware/ValidationMiddleware");
const { projectSchema } = require("../../Utils/Validation");
const GetProjectList = require("./Controller/getProjectlistAdmin");

const router = require("express").Router();

router.post(
  "/create-project",
  verifyToken,
  ValidationMiddleware(projectSchema),
  CreateProject
);
router.post("/assign-client", verifyToken, AssignClient);
router.get("/get-project/:id?", verifyToken, GetProject);
router.get("/client-project/:id?", verifyToken, GetClientProject);
router.get("/project-settings/:id?", verifyToken, GetProjectSettings);
router.patch(
  "/update-project/:id?",
  verifyToken,
  ValidationMiddleware(projectSchema),
  UpdateProject
);
router.get("/get-all-projects-list",verifyToken,GetProjectList)

module.exports = router;
