const router = require("express").Router();
const Product = require("./model"); //controller import
const multer = require("multer");
const upload = multer({ dests: "uploads" });
const path = require("path");
const fs = require("fs");
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.minetype === "image/png" || file.minetype === "image/jpg" || file.minetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single("image_url"));

// router.post("/product", upload.single("image"), async (req, res) => {
//   const { users_id, name, price, stock, status } = req.body;
//   const image = req.file;
//   console.log(image.path);

//   if (req.file && req.file.path) {
//     const target = path.join(__dirname, "../../uploads", image.originalname);
//     fs.renameSync(image.path, target);
//     // ...
//   } else {
//     res.send({ error: "File tidak ada atau tidak sesuai" });
//   }

//   if (image) {
//     const target = path.join(__dirname, "../../uploads", image.originalname);
//     fs.renameSync(image.path, target);
//     try {
//       await Product.sync();
//       const result = await Product.create({ users_id, name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` });
//       res.send(result);
//     } catch (e) {
//       res.send(e);
//     }
//   }
// });

module.exports = router;
