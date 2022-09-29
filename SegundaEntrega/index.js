import express from "express";
const app = express();

import "dotenv/config.js";

import dbConnect from "./utils/connectMongo.js";
if (process.env.STORAGE === "mongo") {
  dbConnect().then(() => console.log("Conectado a la db."));
}

//~~~~~~~~~IMPORT ROUTES~~~~~~~~~~~~~~~~~~~~~~~~
import productRoutes from "./routes/productos.routes.js";
import carritoRoutes from "./routes/carrito.routes.js";

app.use(express.json());

//~~~~~~~~~~~~~~~ROUTES~~~~~~~~~~~~~~~~~~~~~~~~
app.use("/api/productos", productRoutes);
app.use("/api/carrito", carritoRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App funcionando en http://localhost:${PORT}`);
});