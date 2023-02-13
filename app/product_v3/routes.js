const router = require("express").Router();
const product = require("./model");
const ProductControllerV3 = require("./controller");

router.get("/product", ProductControllerV3.index);

router.get("/product/:id", ProductControllerV3.view);

router.post("/product", ProductControllerV3.store);

router.put("/product/:id", ProductControllerV3.update);

router.delete("/product/:id", ProductControllerV3.destroy);

module.exports = router;
