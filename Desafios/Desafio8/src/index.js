import express from "express";

//Manejador mySql productos:
import { MySQLFunctions } from "./utils/SQLFunctions.js";
const manageProducts = new MySQLFunctions("productos");

//Manejador SQLite3 mensajes:
import { SQLite3Functions } from "./utils/SQLite3Functions.js";
const manageMessages = new SQLite3Functions("mensajes");

//Handlebars:
import { create } from "express-handlebars";

//Websocket:
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";

// Routes
import router from "./routes/productos.routes.js";

const app = express();

// Motor de plantillas:
const hbs = create({
  extname: ".hbs",
  partialsDir: ["src/views/components"],
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "src/views");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Ruta:
app.use("/", router);

const httpServer = new HttpServer(app);
const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log("App en http://localhost:" + PORT);
});

const io = new IOServer(httpServer);

//Sockets:
io.on("connection", async (socket) => {
  console.log("Nuevo usuario conectado", socket.id);
  
  //Enviando productos al hacer login:
  const productList = await manageProducts.getAll();
  console.log(productList);
  await productList.reverse();
  io.sockets.emit("newProducts", productList);
  
  //Enviando mensajes al hacer login:
  const messagesList = await manageMessages.getAll();
  await messagesList.reverse();
  io.sockets.emit("messages", messagesList);
  
  //Productos nuevos:
  socket.on("productAdded", async () => {
    io.sockets.emit("newProducts", productList);
  });
  
  //Mensajes nuevos:
  socket.on("new-msg", async (data) => {
    await manageMessages.create(data);
    io.sockets.emit("messages", messagesList);
  });
});
