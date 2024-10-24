const Admin = require("../../../Model/Admin");
const Item = require("../../../Model/Item");
const Supplier = require("../../../Model/Supplier");
const Brand = require("../../../Model/Brand");
const PackSize = require("../../../Model/PackSize");
const Shade = require("../../../Model/Shade");
const Other = require("../../../Model/Other");

const editItem = async (req, res) => {
  const isAdmin = await Admin.findAdminById(req.admin);
  if (!isAdmin) {
    return res.status(404).json({ message: "Not Authorized" });
  }

  let {
    category,
    brand,
    supplier,
    productName,
    productDescription,
    packSize,
    price,
    coveragePerUnit,
    shade,
    otherFeature,
  } = req.body;

  const { itemId } = req.params;

  const isCategory = await Other.findMaterialById(category);
  if (!isCategory) {
    return res.status(400).json({
      error: {
        message: "Invalid Category",
      },
    });
  }

  const isBrand = await Brand.getByBrandId(brand);
  if (!isBrand) {
    return res.status(400).json({
      error: {
        message: "Invalid Brand",
      },
    });
  }

  const isSupplier = await Supplier.getBySupplierId(supplier);
  if (!isSupplier) {
    return res.status(400).json({
      error: {
        message: "Invalid Supplier",
      },
    });
  }

  const isPackSize = await PackSize.getByPackSizeId(packSize);
  if (!isPackSize) {
    return res.status(400).json({
      error: {
        message: "Invalid Supplier",
      },
    });
  }

  const isShade = await Shade.getByShadeId(shade);
  if (!isShade) {
    return res.status(400).json({
      error: {
        message: "Invalid Supplier",
      },
    });
  }

  try {
    // Find the material and update the fields
    const updatedMaterial = await Item.updateItem(itemId, {
      category,
      brand,
      supplier,
      productName,
      productDescription,
      packSize,
      price,
      coveragePerUnit,
      shade,
      otherFeature,
    });

    if (!updatedMaterial) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({
      message: "Item updated successfully",
      data: updatedMaterial,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating Item", error });
  }
};

module.exports = editItem;
