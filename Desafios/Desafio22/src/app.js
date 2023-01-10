import express from "express";
const app = express();
import "dotenv/config";

//~~~~~~~~~IMPORT ROUTES~~~~~~~~~~~~~~~~~~~~~~~~
import productRoutes from "./routes/productos.routes.js";
import carritoRoutes from "./routes/carrito.routes.js";
import userRouter from "./routes/user.routes.js";
//configuracion mongo:
import dbConnect from "./utils/connectMongo.js";
// Importar GraphQL:
import { graphqlHTTP } from "express-graphql";
import { productGQLSchema } from "./graphql/schemas/productSchema.js";
import { carritoSchema } from "./graphql/schemas/CartSchema.js";
import {
  listarProductos,
  crearProducto,
  obtenerProducto,
  updateProducto,
  deleteProducto,
} from "./graphql/resolvers/productResolvers.js";
import {
  listarCarritos,
  obtenerCarrito,
  crearCarrito,
  deleteCarrito,
} from "./graphql/resolvers/carritoResolvers.js";
//Si el storage está configurado para mongo conectamos la db:
if (process.env.STORAGE === "mongo") {
  dbConnect().then(() => console.log("Conectado a la db."));
}

//~~~~~~~~~~~~~~~GRAPHQL~~~~~~~~~~~~~~~~~~~~~~~~
app.use(
  "/graphql/productos",
  graphqlHTTP({
    schema: productGQLSchema,
    rootValue: {
      listarProductos,
      crearProducto,
      obtenerProducto,
      updateProducto,
      deleteProducto,
    },
    graphiql: false,
  })
);
app.use(
  "/graphql/carrito",
  graphqlHTTP({
    schema: carritoSchema,
    rootValue: { listarCarritos, obtenerCarrito, crearCarrito, deleteCarrito },
    graphiql: false,
  })
);
app.use(express.json());
//~~~~~~~~~~~~~~~ROUTES~~~~~~~~~~~~~~~~~~~~~~~~
app.use("/productos", productRoutes);
app.use("/carrito", carritoRoutes);
app.use("/user", userRouter);

export default app;