const express = require("express");
const { generateData } = require("../utils/generateData");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("../views/home.hbs");
});

//Productos test:
router.get("/api/productos-test", (req, res) => {
  const data = generateData(5);
  return res.render("randomproducts", { productos: data });
});

module.exports = router;