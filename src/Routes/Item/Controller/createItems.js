const Admin = require("../../../Model/Admin");
const Item = require("../../../Model/Item");
const Supplier = require("../../../Model/Supplier");
const Brand = require("../../../Model/Brand");
const PackSize = require("../../../Model/PackSize");
const Shade = require("../../../Model/Shade");
const Other = require("../../../Model/Other");

const CreateItems = async (req, res) => {
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

  const productCode =
    isCategory.materialCode +
    isBrand.brandCode +
    isSupplier.supplierCode +
    isShade.shadeCode +
    isPackSize.packSizeCode;

  const data = await Item.createItem({
    category,
    brand,
    supplier,
    productName,
    productCode,
    productDescription,
    packSize,
    price,
    coveragePerUnit,
    shade,
    otherFeature,
  });

  res.send({ message: "Item Created", data });
};

module.exports = CreateItems;
