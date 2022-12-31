const router = require("express").Router();

router.get("/", (req, res) => {
  const { page, total } = req.query;
  res.send({
    status: "succesfully",
    message: "welcome to express",
    page,
    total,
  });
});

router.get("/product/:id", (req, res) => {
  res.send({
    id: req.params.id,
  });
});

router.post("/product/", (req, res) => {
  res.json(req.body);
});

router.get("/:category/:tag", (req, res) => {
  const { category, tag } = req.params;
  res.send({ category, tag });
});
module.exports = router;
