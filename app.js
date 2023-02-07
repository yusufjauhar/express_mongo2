require("./config/mongoose");
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
// const ProductRouter = require("./app/product/routes");
// const ProductRouterV2 = require("./app/product_v2/routes");
const productRouterV3 = require("./app/product_v3/routes");
const logger = require("morgan");
const multer = require("multer");
const upload = multer();
const product = require("./app/product_v3/model");

app.use(cors());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(upload.array());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads"))); //static
// app.use("/api/v1", ProductRouter);
// app.use("/api/v2", ProductRouterV2);
app.use("/api/v3", productRouterV3);

app.use((req, res, next) => {
  //404 error
  res.status(404);
  res.send({
    status: "failed",
    message: "resource" + req.originalUrl + "not found",
  });
});
app.listen(3000, () => console.log("server: http://localhost:3000")); //server
