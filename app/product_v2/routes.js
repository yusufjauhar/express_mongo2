const router = require("express").Router();
const multer = require("multer");
const ProductControllerV2 = require("./controller");

//index
router.get("/productV2", ProductControllerV2.index);

router.get("/productV2/:id", ProductControllerV2.view);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const upload = multer({ storage: fileStorage });

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/PNG" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

router.post("/productV2/", upload.single("image"), ProductControllerV2.store);

router.put("/productV2/:id", upload.single("image"), ProductControllerV2.update);

router.delete("/productV2/:id", ProductControllerV2.destroy);

module.exports = router;
