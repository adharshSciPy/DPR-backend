const Admin = require("../../../Model/Admin");
const Purchase = require("../../../Model/Purchase");
const Inventory = require("../../../Model/Inventory");
const Project = require("../../../Model/Project");
const Client = require("../../../Model/Client");
const Item = require("../../../Model/Item");

const CreateMaterialOutward = async (req, res) => {
  const UserType = ["Admin", "User", "Manager"];
  if (!UserType.includes(req.type)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  let { item, location, quantity } = req.body;

  quantity = Number(quantity);

  const isItem = Item.getByItemId(item);
  if (!isItem) {
    return res.status(400).json({
      error: {
        message: "Invalid Category",
      },
    });
  }

  const inventories = await Inventory.findInventoryUserId(req.admin);
  if (!inventories || inventories.stockQuatity - Number(quantity) < 0) {
    return res.status(400).json({
      error: {
        message: "Out of Stock",
      },
    });
  }
  console.log(inventories, "In");
  console.log(typeof inventories.stockQuatity, "Type");

  inventories.stockQuatity = Number(inventories.stockQuatity) - quantity;

  await inventories.save();

  let role;

  let client;
  const isAdmin = await Admin.findAdminById(location);
  if (!isAdmin) {
    const isProject = await Project.getByProjectId(location);
    if (!isProject) {
      return res.status(404).json({ message: "Invaild Location" });
    }
    role = "User";
    client = isProject.clients;
  } else role = "Admin";

  const data = await Purchase.createMaterialOutward({
    item,
    location,
    quantity,
    userId: req.admin,
  });

  if (role == "Admin") {
    const materialInward = await Purchase.createMaterialInward({
      // inventoryId: newInventory._id,
      item,
      location,
      purchaseId: data._id,
      stockQuatity: quantity,
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
      stockQuatity: quantity,
      role,
      clients: client,
    });
    const clientes = await Client.findClientById(client);
    clientes.materialInward.push((await materialInward)._id);
    await clientes.save();
  }

  res.send({
    message: "Material Send Successfully",
    data,
  });
};

module.exports = CreateMaterialOutward;
