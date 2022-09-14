import express from "express";
import { MySQLFunctions } from "../utils/SQLFunctions.js";
// IO client
import { io as IOClient } from "socket.io-client";

const router = express.Router();
const manageProducts = new MySQLFunctions("productos");

router.get("/", (req, res) => {
  res.render("home");
});

//obtener todos los productos:
router.get("/productos", async (req, res) => {
  const LISTA_PRODUCTOS = await manageProducts.getAll();
  res.render("productos", { productos: LISTA_PRODUCTOS });
});

//Agregar un producto:
router.post("/productos", async (req, res) => {
  const { title, price, thumbnail } = req.body;
  const LISTA_PRODUCTOS = await manageProducts.getAll();

  const existingProducts = LISTA_PRODUCTOS.filter((item) => item.title === title);
  if (existingProducts.length > 0) {
    return res
      .status(400)
      .json({ error: "El producto ya se encuentra en la base de datos" });
  }

  if (!title.trim() || !price.trim() || !thumbnail.trim()) {
    return res.status(400).json({ error: "Todos los campos son requeridos." });
  }

  //probemos la sql:
  await manageProducts.create(req.body);
  // await manageProducts.closeConnection();

  const socket = IOClient("ws://localhost:8080");

  // send a message to the server
  socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

  // receive a message from the server
  socket.on("hello from server", (...args) => {
    console.log('hello')
  });

  res.redirect("/");
});

export default router;
