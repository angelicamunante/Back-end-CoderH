import { daoCarrito, daoProductos } from "../dao/daoIndex.js";

const createCart = async (req, res) => {
  const cart = { products: [] };
  try {
    await daoCarrito.save(cart);
    return res.json({ msg: "carrito creado con éxito." });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const getAllCarritos = async (req, res) => {
  try {
    const cartList = await daoCarrito.getAll();
    return res.json(cartList);
  } catch (e) {
    return res.json({ error: e.message });
  }
};

const deleteCart = async (req, res) => {
  const { id } = req.params;
  try {
    await daoCarrito.deleteById(id);
    return res.json({ msg: "Carrito eliminado con éxito." });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const addProductCart = async (req, res) => {
  const { idCarrito, idProducto } = req.params;
  try {
    const product = await daoProductos.getById(idProducto);
    if (!product)
      return res.status(404).json({ error: "Producto no encontrado." });
    await daoCarrito.postById(idCarrito, product);
    return res.json({ msg: "producto agregado al carrito con éxito." });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const getProductCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await daoCarrito.getById(id);
    return res.json(cart.products);
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const deleteProductCart = async (req, res) => {
  const { idCarrito, idProducto } = req.params;
  try {
    await daoCarrito.selectedDelete(idCarrito, idProducto);
    return res.json({
      msg: `El producto con el id ${idProducto} fue eliminado con éxito del carrito ${idCarrito}`,
    });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

export {
  createCart,
  deleteCart,
  getProductCart,
  addProductCart,
  deleteProductCart,
  getAllCarritos,
};