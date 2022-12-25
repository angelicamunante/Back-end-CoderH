import express from "express";
const app = express();
import "dotenv/config";

//~~~~~~~~~IMPORT ROUTES~~~~~~~~~~~~~~~~~~~~~~~~
import productRoutes from "./routes/productos.routes.js";
import carritoRoutes from "./routes/carrito.routes.js";
import userRouter from "./routes/user.routes.js";
//configuracion mongo:
import dbConnect from "./utils/connectMongo.js";

//Si el storage está configurado para mongo conectamos la db:
if (process.env.STORAGE === "mongo") {
  dbConnect().then(() => console.log("Conectado a la db."));
}

app.use(express.json());
//~~~~~~~~~~~~~~~ROUTES~~~~~~~~~~~~~~~~~~~~~~~~
app.use("/productos", productRoutes);
app.use("/carrito", carritoRoutes);
app.use("/user", userRouter);

export default app;