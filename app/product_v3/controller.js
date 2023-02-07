const router = require("express").Router();
const product = require("./model");

const index = (req, res) => {
  product
    .find()
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const store = (req, res) => {
  const { name, price, stock, status } = req.body;
  product
    .create({ name, price, stock, status })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));

  // console.log(req.body);
};

const view = (req, res) => {
  const id = req.params.id;
  product
    .findById(id)
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const update = (req, res) => {
  const { name, price, stock, status } = req.body;
  const id = req.params.id;
  product
    .findByIdAndUpdate(id, { name, price, stock, status })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const destroy = (req, res) => {
  const id = req.params.id;
  product
    .findByIdAndDelete(id)
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

module.exports = {
  index,
  view,
  store,
  update,
  destroy,
};
