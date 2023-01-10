import { daoCarrito } from "../dao/daoIndex.js";
import User from "../models/mongo/users.model.js";
import { logger } from "../utils/logger.js";

const createCart = async (req, res) => {
  try {
    const { uid } = req.params;
    //Chequeamos que el user exista:
    const user = await User.findOne({ _id: uid });
    if (!user) return res.json({ status: 404, msg: "Usuario no existe" });
    //Chequeamos que el usuario no tenga un carrito:
    const carrito = await daoCarrito.getByUser(uid);
    //Si no existe lo creamos y le agregamos el producto:
    if (!carrito) {
      await daoCarrito.save({ user: uid, products: [] });
    } else {
      return res.json({ status: 400, msg: "El usuario ya tiene un carrito" });
    }

    return res.json({ msg: "carrito creado con éxito." });
  } catch (error) {
    logger.warn(e.message);
    return res.json({ status: 500, msg: error.message });
  }
};

const getAllCarritos = async (req, res) => {
  try {
    const cartList = await daoCarrito.getAll();
    return res.json(cartList);
  } catch (e) {
    logger.warn(e.message);
    return res.json({ status: 500, msg: e.message });
  }
};

const deleteCart = async (req, res) => {
  const { id } = req.params;
  try {
    await daoCarrito.deleteById(id);
    return res.json({ msg: "Carrito eliminado con éxito." });
  } catch (error) {
    logger.warn(e.message);
    return res.json({ status: 500, msg: error.message });
  }
};

const addProductCart = async (req, res) => {
  try {
    const { uid, product } = req.params;
    //Chequeamos que el user exista:
    const user = await User.findOne({ _id: uid });
    if (!user) return res.json({ status: 404, msg: "Usuario no existe" });
    //Chequeamos que el usuario no tenga un carrito:
    const carrito = await daoCarrito.getByUser(uid);
    //Si no existe lo creamos y le agregamos el producto:
    if (!carrito) {
      await daoCarrito.save({ user: uid, products: [product] });
    } else {
      //Si ya existe le agregamos solo el producto:
      carrito.products.push(product);
      await carrito.save();
    }

    return res.json({ status: 200, msg: "Producto agregado con éxito" });
  } catch (e) {
    logger.warn(e.message);
    return res.json({ status: 500, msg: error.message });
  }
};

const getProductCart = async (req, res) => {
  const { uid } = req.params;
  try {
    const cart = await daoCarrito.getProductCart(uid);
    return res.json({ status: 200, msg: "OK", data: cart });
  } catch (e) {
    logger.warn(e.message);
    return res.json({ status: 500, msg: error.message });
  }
};

const deleteProductCart = async (req, res) => {
  const { uid, product } = req.params;
  try {
    const cart = await daoCarrito.deleteProductCart(uid, product);
    return res.json({ status: 200, msg: "OK", data: cart });
  } catch (e) {
    logger.warn(e.message);
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