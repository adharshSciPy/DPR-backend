const Admin = require("../../../Model/Admin");
const Purchase = require("../../../Model/Purchase");
const Inventory = require("../../../Model/Inventory");
const Project = require("../../../Model/Project");
const Client = require("../../../Model/Client");
const Other = require("../../../Model/Other");
const { ObjectId } = require("mongodb");
const Item = require("../../../Model/Item");

const CreatePurchase = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(401).json({ message: "Not Authorized" });
  }
  let {
    item,
    location,
    stockQuatity,
    measurableUnit,
    coveragePerUnit,
    otherFeature,
  } = req.body;

  let itemValidation = false;
  let locationValidation = false;
  if (location == req.admin || isAdmin.projects.includes(location)) {
    locationValidation = true;
  }
  let items;
  let client;
  let role;
  if (location == req.admin) {
    role = "Admin";
  }
  if (isAdmin.projects.includes(location)) {
    role = "User";
    const isProject = await Project.getByProjectId(location);
    client = isProject.clients;
  }
  if (locationValidation == false) {
    return res
      .status(400)
      .json({ message: "Invalid Location put a valid one" });
  }
  items = await Item.getByItemId(item);
  if (items) {
    itemValidation = true;
  }
  if (itemValidation == false) {
    return res
      .status(400)
      .json({ message: "Invalid Item please put a valid item" });
  }
  const data = await Purchase.createPurchase({
    item,
    location,
    stockQuatity,
    measurableUnit,
    coveragePerUnit,
    otherFeature,
  });

  // if (location === "Central Inventory") {
  //   isAdmin.inventory = data._id;
  //   await isAdmin.save();
  // } else {
  //   const isProject = await Project.getByProjectId(location);
  //   if (!isProject) {
  //     await Inventory.deleteByInventoryId(data._id);
  //     return res.status(400).json({ message: "Invalid Location" });
  //   }
  //   isProject.inventory = data._id;
  //   isProject.save();
  // }

  if (role == "Admin") {
    const materialInward = await Purchase.createMaterialInward({
      // inventoryId: newInventory._id,
      item,
      location,
      purchaseId: data._id,
      stockQuatity,
      role,
      admin: req.admin,
    });
    isAdmin.materialInward.push((await materialInward)._id);
    await isAdmin.save();
  }

  if (role == "User") {
    const materialInward = await Purchase.createMaterialInward({
      // inventoryId: newInventory._id,
      item,
      location,
      purchaseId: data._id,
      stockQuatity,
      role,
      clients: client,
    });
    const clientes = await Client.findClientById(client);
    clientes.materialInward.push((await materialInward)._id);
    await clientes.save();
  }

  res.send({
    message: "Purchased Item Successfully",
    data,
  });
};

module.exports = CreatePurchase;
