import express from "express";
const app = express();

//configuramos las variables de entorno
import "dotenv/config.js";

//configuracion mongo:
import dbConnect from "./utils/connectMongo.js";
//Si el storage está configurado para mongo conectamos la db:
if (process.env.STORAGE === "mongo") {
  dbConnect().then(() => console.log("Conectado a la db."));
}

// configuración firebase:

// if (process.env.STORAGE === "firebase") {
//   connectFirebase();
//   console.log("conectado a firebase");
// }


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