const {
  createProductService,
  listProductService,
} = require("../services/products.services");

const { logger } = require("../config/log");
const createProductGET = (req, res) => {
  logger.info(`Método POST: ruta "/crear"`);
  return res.render("create");
};

const listProduct = async (req, res) => {
  logger.info(`Método GET: ruta "/productos"`);
  const lista = await listProductService();
  res.render("productos", { productos: lista });
};

const createProduct = async (req, res) => {
  logger.info(`Método POST: ruta "/productos"`);
  const { title, price, thumbnail } = req.body;

  if (!title.trim() || !price.trim() || !thumbnail.trim()) {
    return res.status(400).json({ error: "Todos los campos son requeridos." });
  }
  await createProductService(title, price, thumbnail);
  return res.redirect("/");
};
module.exports = { createProductGET, listProduct, createProduct };