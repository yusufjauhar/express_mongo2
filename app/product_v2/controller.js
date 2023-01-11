const router = require("express").Router();
const Product = require("./model"); //controller import
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const connection = require("../../config/sequelize");

const index = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (e) {
    res.send(e);
  }
};

const view = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.send({ error: "Product not found" });
    }
  } catch (e) {
    res.send(e);
  }
};

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

const store = async (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  console.log(image.path);
  if (req.file && req.file.path) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    // fs.renameSync(image.path, target);
    // ...
  } else {
    res.send({ error: "File tidak ada atau tidak sesuai" });
  }
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    try {
      await Product.sync();
      const result = await Product.create({ users_id, name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` });
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  }
  console.log(req.file);
};

const update = async (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  if (req.file && req.file.path) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
  } else {
    res.send({ error: "File tidak ada atau tidak sesuai" });
  }
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      if (image) {
        const target = path.join(__dirname, "../../uploads", image.originalname);
        fs.renameSync(image.path, target);
        product.image_url = `http://localhost:3000/public/${image.originalname}`;
      }
      product.users_id = users_id;
      product.name = name;
      product.price = price;
      product.stock = stock;
      product.status = status;
      await product.save();
      res.send(product);
    } else {
      res.send({ error: "Product not found" });
    }
  } catch (e) {
    res.send(e);
  }
};

const destroy = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.send({ message: "Product successfully deleted" });
    } else {
      res.send({ error: "Product not found" });
    }
  } catch (e) {
    res.send(e);
  }
};

module.exports = {
  index,
  view,
  store,
  update,
  destroy,
};
