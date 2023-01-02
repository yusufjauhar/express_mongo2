const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const ProductController = require("./controller");

router.get("/product", ProductController.index);

router.get("/product/:id", ProductController.view);

router.post("/product/", upload.single("image"), ProductController.store);

// router.get("/:category/:tag", (req, res) => {
//   const { category, tag } = req.params;
//   res.send({ category, tag });
// });

// app.post("/cover", upload.single("image"), function (req, res, next) {});

module.exports = router;
