const express = require("express");
const {
  createProductGET,
  createProduct,
  listProduct,
} = require("../controllers/productos.ctrl");
const ProductRouter = express.Router();

//Ruta crear productos:

ProductRouter.get("/crear", createProductGET);

//obtener todos los productos:
ProductRouter.get("/productos", listProduct);

//Agregar un producto:
ProductRouter.post("/productos", createProduct);

module.exports = { ProductRouter };