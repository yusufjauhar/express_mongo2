const express = require("express");
const app = express();
const router = require("./routes");
const log = require("./middlewares/logger");

app.use(log);
app.use(router);
app.use((req, res, next) => {
  //404 error
  res.status(404);
  res.send({
    status: "failed",
    message: "resource" + req.originalUrl + "not found",
  });
});
app.listen(3000, () => console.log("server: http://localhost:3000")); //server
