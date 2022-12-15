const mongoContainer = require("../../container/mongoContainer");
const Producto = require("../../models/Product.model.js");
class productosDao extends mongoContainer {
  constructor() {
    super(Producto);
  }
  async listar() {
    try {
      return await Producto.find({});
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async crear(title, price, thumbnail) {
    try {
      return await Producto.create({ title, price, thumbnail });
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async buscarPorId(id) {
    try {
      return await Producto.findOne({ _id: id });
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

module.exports = productosDao;