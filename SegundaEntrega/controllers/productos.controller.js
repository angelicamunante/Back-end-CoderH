import { daoProductos } from "../dao/daoIndex.js";

const getAllProducts = async (req, res) => {
  try {
    const productList = await daoProductos.getAll();
    if (productList) {
      return res.json(productList);
    } else {
      throw new Error("No se encontró la lista de productos.");
    }
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const getOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await daoProductos.getById(id);
    if (product) {
      return res.json({ product });
    } else {
      return res.status(404).json("Producto no encontrado.");
    }
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  const { name, description, code, image, price, stock } = req.body;
  try {
    const newProduct = { name, description, code, image, price, stock };
    await daoProductos.save(newProduct);
    return res.json({ msg: "producto agregado con éxito." });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, code, image, price, stock } = req.body;
  try {
    const productUpdated = { name, description, code, image, price, stock };
    await daoProductos.updateOne(id, productUpdated);
    return res.json({ msg: "producto actualizado con éxito." });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await daoProductos.deleteById(id);
    return res.json({ msg: "producto eliminado con éxito." });
  } catch (error) {
    return res.json({ error: error.message });
  }
};
export {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};