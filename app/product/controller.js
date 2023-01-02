const connection = require("../../config/connection");
const path = require("path");
const fs = require("fs");

const index = (req, res) => {
  connection.query(
    {
      sql: "SELECT * FROM products",
    },
    _response(res)
  );
};

const view = (req, res) => {
  connection.query(
    {
      sql: "SELECT * FROM products WHERE id = ?",
      values: [req.params.id],
    },
    _response(res)
  );
};

const store = (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
  }
  connection.query(
    {
      sql: "INSERT INTO products (users_id,name, price, stock, status, image_url) VALUES (?, ?, ?, ?, ?, ?) ",
      values: [parseInt(users_id), name, price, stock, status, `http://localhost:3000/public/${image.originalname}`],
    },
    _response(res)
  );
};
const _response = (res) => {
  return (error, result) => {
    if (error) {
      res.send({
        status: "failed",
        response: "failed to fecth datas",
      });
    } else {
      res.send({
        status: "success",
        response: result,
      });
    }
  };
};

module.exports = {
  index,
  view,
  store,
};
