const Project = require("../Model/Project");

async function calculateTotalArea(projectId) {
  const project = await Project.getProjectSettings(projectId);

  let totalArea = 0;

  project.forEach((building) => {
    building.unit.forEach((unit) => {
      unit.elevation.forEach((elevation) => {
        elevation.surface.forEach((surface) => {
          const numActivities = surface.system.reduce(
            (acc, system) => acc + system.activity.length,
            0
          );
          totalArea += (surface.area || 0) * numActivities;
        });
      });
    });
  });

  const updateProject = await Project.updateByProjectId(projectId, {
    totalArea: totalArea,
  });
}

async function calculateTotalAreaCompleted(projectId) {
  const project = await Project.getProjectSettings(projectId);

  let totalAreaCompleted = 0;

  project.forEach((building) => {
    building.unit.forEach((unit) => {
      unit.elevation.forEach((elevation) => {
        elevation.surface.forEach((surface) => {
          surface.system.forEach((system) => {
            system.activity.forEach((activity) => {
              totalAreaCompleted += activity.areaCompleted;
            });
          });
        });
      });
    });
  });

  const updateProject = await Project.updateByProjectId(projectId, {
    totalAreaCompleted: totalAreaCompleted,
  });
}

module.exports = { calculateTotalArea, calculateTotalAreaCompleted };
