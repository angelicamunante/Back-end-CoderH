import { Router } from "express";

const routerCart = Router();

//~~~~~~~~~~~~~~~~CONTROLLER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import {
  createCart,
  deleteCart,
  getProductCart,
  addProductCart,
  deleteProductCart,
  getAllCarritos,
} from "../controllers/carrito.controller.js";

//~~~~~~~~~~~~~~~~~ROUTES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
routerCart.post("/:uid", createCart);
routerCart.get("/lista", getAllCarritos);
routerCart.delete("/:id", deleteCart);
routerCart.put("/agregar/:uid/:product", addProductCart);
routerCart.get("/:uid", getProductCart);
routerCart.delete("/eliminar/:uid/:product", deleteProductCart);
export default routerCart;