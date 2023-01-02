const express = require("express");
const path = require("path");
const app = express();
const ProductRouter = require("./app/product/routes");
const logger = require("morgan");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());   JSON
app.use("/public", express.static(path.join(__dirname, "uploads"))); //static
app.use("/api/v1", ProductRouter);
app.use((req, res, next) => {
  //404 error
  res.status(404);
  res.send({
    status: "failed",
    message: "resource" + req.originalUrl + "not found",
  });
});
app.listen(3000, () => console.log("server: http://localhost:3000")); //server
