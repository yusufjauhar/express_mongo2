const express = require("express");
const path = require("path");
const app = express();
const ProductRouter = require("./app/product/routes");
const ProductRouterV2 = require("./app/product_v2/routes");
const logger = require("morgan");
const multer = require("multer");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads"))); //static
app.use("/api/v1", ProductRouter);
app.use("/api/v2", ProductRouterV2);


app.use((req, res, next) => {
  //404 error
  res.status(404);
  res.send({
    status: "failed",
    message: "resource" + req.originalUrl + "not found",
  });
});
app.listen(3000, () => console.log("server: http://localhost:3000")); //server
