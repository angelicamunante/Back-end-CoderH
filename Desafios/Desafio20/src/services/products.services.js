const daoProductos = require("../database/dao/productoDao");
const dao = daoProductos.instanciar();
const createProductService = async (title, price, thumbnail) => {
  return await dao.crear(title, price, thumbnail);
};
const listProductService = async () => {
  return await dao.listar();
};
module.exports = { createProductService, listProductService };