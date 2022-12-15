const { createProductService } = require("../services/products.services");
const { daoProductos } = require("../container/productos.dao");
const { logger } = require("../config/log");
const createProductGET = (req, res) => {
  logger.info(`Método POST: ruta "/crear"`);
  return res.render("create");
};

const listProduct = (req, res) => {
  logger.info(`Método GET: ruta "/productos"`);
  const lista = daoProductos.listProductos();
  res.render("productos", { productos: lista });
};

const createProduct = (req, res) => {
  logger.info(`Método POST: ruta "/productos"`);
  const { title, price, thumbnail } = req.body;

  const productoCheck = PRODUCTOS_LISTA.filter((item) => item.title === title);
  if (productoCheck.length !== 0) {
    return res
      .status(400)
      .json({ error: "El producto ya se encuentra en la base de datos" });
  }

  if (!title.trim() || !price.trim() || !thumbnail.trim()) {
    return res.status(400).json({ error: "Todos los campos son requeridos." });
  }
  createProductService(title, price, thumbnail);
  return res.redirect("/");
};
module.exports = { createProductGET, listProduct, createProduct };