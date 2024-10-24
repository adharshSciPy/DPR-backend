const Project = require("../Schema/Project");

const createProject = (data) => Project.create(data);

const getByProjectId = async (_id) =>
  await Project.findOne({ _id }).populate("settings").select("-admin");

const getAllProjectById = async (userList) => {
  const project = await Project.find({ _id: { $in: userList } }).select(
    "-admin -clients -settings"
  );
  return project ? project : null;
};

const findAllProjects = async () => {
  const project = await Project.find().select("-admin -clients -settings");
  return project ? project : null;
};

const getProjectSettings = async (_id) => {
  const project = await Project.findById(_id)
    .select("settings")
    .populate({
      path: "settings",
      populate: {
        path: "unit",
        populate: {
          path: "elevation",
          populate: {
            path: "surface",
            populate: {
              path: "system",
              populate: {
                path: "activity",
              },
            },
          },
        },
      },
    });
  return project ? project.settings : null;
};

const updateByProjectId = async (projectId, data) =>
  await Project.findByIdAndUpdate(projectId, { $set: data }, { new: true });

const udateDprArray = async (_id, dprId) =>
  await Project.updateOne({ _id }, { $push: { dpr: dprId } });

const getAdminProjects = async () => {
  try {
    // Aggregation pipeline
    const pipeline = [
      {
        $match: {
          clients: { $ne: [] }, // Filter out projects with empty clients array
        },
      },
      {
        $lookup: {
          from: "admins",
          localField: "admin",
          foreignField: "_id",
          as: "adminDetails",
        },
      },
      {
        $unwind: "$adminDetails",
      },
      {
        $sort: { "adminDetails._id": 1 },
      },
      {
        $group: {
          _id: "$adminDetails._id",
          adminProjects: {
            $push: {
              _id: "$_id",
              name: "$name",
            },
          },
        },
      },
    ];

    const result = await Project.aggregate(pipeline).exec();
    console.log(result);
    return result;
  } finally {
    //return result
  }
};

module.exports = {
  createProject,
  getByProjectId,
  getAllProjectById,
  getProjectSettings,
  updateByProjectId,
  udateDprArray,
  getAdminProjects,
  findAllProjects,
};
