const Item = require("../../../Model/Item");
const Admin = require("../../../Model/Admin");

const GetItems = async (req, res) => {
  const UserType = ["Admin", "User", "Manager"];
  if (!UserType.includes(req.type)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.query.id;

  if (userId) {
    const data = await Item.getByItemId(userId);
    if (!data) {
      return res.status(404).json({ message: "Item not found" });
    }

    return res.status(200).json({
      data,
      message: "Project Find Successfully",
    });
  } else {
    // Fetch all users associated with the admin
    const data = await Item.getAllItem();
    return res.status(200).json({ data });
  }

  // const isAdmin = await Admin.findAdminById(req.admin);
  // if (!isAdmin) {
  //   return res.status(404).json({ message: "Not Authorized" });
  // }
  // let items
  // let ss=req.query.id
  // console.log(ss)
  // if(!req.query.id){
  //    items= await Item.getAllItems()
  // }
  // else{
  //   items= await Item.getItems(ss);
  // }
  // let data=items
  // if (data) {
  //     res.send({
  //       message: "Item found Successfully",
  //       data,
  //     });
  //   }
  //   if (!data) {
  //     res.send({
  //       data: [],
  //       message: "Item not found invalid code ",
  //     });
  //   }
};

module.exports = GetItems;
