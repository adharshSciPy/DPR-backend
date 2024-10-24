const Client = require("../../../Model/Client");
const Project = require("../../../Model/Project");
const ManPower = require("../../../Model/ManPower");
const Surface = require("../../../Model/Surface");
const Activity = require("../../../Model/Activity");
const Dpr = require("../../../Model/Dpr");
const Inventory = require("../../../Model/Inventory");
const { calculateTotalAreaCompleted } = require("../../../Utils");

const updateDpr = async (req, res) => {
  const { dprId } = req.params; // The ID of the DPR to update
  const client = await Client.findClientById(req.admin);
  if (!client || req.type !== "User") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  if (client.isBanned) {
    return res
      .status(403)
      .json({ error: { message: "You are banned by the user" } });
  }

  let {
    date,
    projectId,
    building,
    unit,
    elevation,
    surface,
    system,
    activity,
    area,
    materialUsed,
    company,
    numberofOperative,
  } = req.body;

  const updatedOn = Date.now();

  const existingDpr = await Dpr.getByDprId(dprId);
  if (!existingDpr) {
    return res.status(404).json({
      error: { message: "DPR not found" },
    });
  }

  const settings = await Project.getProjectSettings(projectId);
  if (!settings) {
    return res.status(400).json({
      error: { message: "Invalid Project Id" },
    });
  }

  const isIdPresent = settings.some(
    (buildings) =>
      buildings._id.toString() === building &&
      buildings.unit.some(
        (units) =>
          units._id.toString() === unit &&
          units.elevation.some(
            (elevations) =>
              elevations._id.toString() === elevation &&
              elevations.surface.some(
                (surfaces) =>
                  surfaces._id.toString() === surface &&
                  surfaces.system.some(
                    (systems) =>
                      systems._id.toString() === system &&
                      systems.activity.some(
                        (activities) => activities._id.toString() === activity
                      )
                  )
              )
          )
      )
  );

  if (!isIdPresent) {
    return res.status(400).json({
      error: {
        message:
          "Selection of Building, Unit, Elevation, Surface, System or Activity is not valid",
      },
    });
  }

  const manpower = ManPower.getByManPowerId(company);
  if (!manpower) {
    return res.status(400).json({ error: { message: "Invalid Company" } });
  }

  const activityData = await Activity.getByActivityId(activity);
  const surfaceData = await Surface.getBySurfaceId(surface);

  // Check if the updated area exceeds the total surface area
  if (activityData.areaCompleted + area - existingDpr.area > surfaceData.area) {
    return res.status(400).json({
      error: { message: "You exceed the Total Area Limit" },
    });
  }

  // Handle material stock updates
  for (const material of materialUsed) {
    const inventory = await Inventory.findInventoryByItem(material.item);

    if (!inventory) {
      return res.status(400).json({
        error: {
          message: `Item with ID ${material.item} not found in inventory`,
        },
      });
    }

    const existingMaterial = existingDpr.materialUsed.find(
      (m) => m.item.toString() === material.item
    );

    const stockChange = existingMaterial
      ? material.usage - existingMaterial.usage
      : material.usage;

    if (inventory.stockQuatity < stockChange) {
      return res.status(400).json({
        error: { message: `Out of stock for item: ${material.item}` },
      });
    }
  }

  // Update stock quantities based on the changes in materials used
  for (const material of materialUsed) {
    const existingMaterial = existingDpr.materialUsed.find(
      (m) => m.item.toString() === material.item
    );

    const stockChange = existingMaterial
      ? material.usage - existingMaterial.usage
      : material.usage;

    await Inventory.decrementStockByItemId(material.item, stockChange);
  }

  // Update DPR details
  const updatedDpr = await Dpr.updateDprById(dprId, {
    date,
    projectId,
    building,
    unit,
    elevation,
    surface,
    system,
    activity,
    area,
    materialUsed,
    company,
    numberofOperative,
    updatedOn,
  });

  // Update the area completed in Activity
  await Activity.updateByActivityId(activityData._id, {
    areaCompleted: activityData.areaCompleted + (area - existingDpr.area),
  });

  await calculateTotalAreaCompleted(projectId);

  res.send({
    message: "DPR Updated Successfully",
    data: updatedDpr,
  });
};

module.exports = updateDpr;
