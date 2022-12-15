const { daoProductos } = require("../container/productos.dao");
const createProductService = (title, price, thumbnail) => {
  daoProductos.crearProducto(title, price, thumbnail);
};
module.exports = { createProductService };