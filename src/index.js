const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const https = require("https");
const app = express();
const port = 5000;
const cors = require("cors");
const swaggerConfig = require("./swaggerConfig");
app.use(express.json());
app.use(cors());

const SignupRouter = require("./Routes/Admin");
const ProjectRouter = require("./Routes/Project");
const ClientRouter = require("./Routes/Client");
const ManPowerRouter = require("./Routes/ManPower");
const BuildingRouter = require("./Routes/Building");
const UnitRouter = require("./Routes/Unit");
const ElevationRouter = require("./Routes/Elevation");
const SurfaceRouter = require("./Routes/Surface");
const SystemRouter = require("./Routes/System");
const ActivityRouter = require("./Routes/Activity");
const DprRouter = require("./Routes/Dpr");
const PurchaseRouter = require("./Routes/Purchase");
const InventoryRouter = require("./Routes/Inventory");
const OtherRouter = require("./Routes/Other");
const ItemRouter = require("./Routes/Item");

require("dotenv").config();

const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://vishvascipy:Vishvadrp@cluster0.ztuvy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Connect to database");
  } catch (error) {
    console.log(error);
  }
};
connect();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/admin", SignupRouter);
app.use("/project", ProjectRouter);
app.use("/client", ClientRouter);
app.use("/man", ManPowerRouter);
app.use("/building", BuildingRouter);
app.use("/unit", UnitRouter);
app.use("/elevation", ElevationRouter);
app.use("/surface", SurfaceRouter);
app.use("/system", SystemRouter);
app.use("/activity", ActivityRouter);
app.use("/dpr", DprRouter);
app.use("/purchase", PurchaseRouter);
app.use("/inventory", InventoryRouter);
app.use("/other", OtherRouter);
app.use("/item", ItemRouter);

if (process.env.NODE_ENV === "productions") {
  const httpsOptions = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH),
  };

  https.createServer(httpsOptions, app).listen(443, () => {
    console.log(`App running on HTTPS, port ${443}`);
    swaggerConfig(app, 443);
  });
} else {
  http.createServer(app).listen(8000, () => {
    console.log(`App running on HTTP, port ${8000}`);
    swaggerConfig(app, 8000);
  });
}
