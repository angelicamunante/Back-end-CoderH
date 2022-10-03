const express = require("express");
require("dotenv").config();
const util = require("util");
//NORMALIZR:
const normalizr = require("normalizr");
const schema = normalizr.schema;

//Esquema del author:
const schemaAuthor = new schema.Entity("author", {}, { idAttribute: "email" });
//Esquema del mensaje:
const schemaMensaje = new schema.Entity(
  "post",
  {
    author: schemaAuthor,
  },
  { idAttribute: "id" }
);
//Esquema de los mensajes:
const schemaMensajes = new schema.Entity(
  "posts",
  {
    mensajes: [schemaMensaje],
  },
  { idAttribute: "id" }
);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const daoMsg = require("./dao/daoindex");

//CONEXIÓN A MONGO:
const dbConnect = require("./utils/connectMongo");
if (process.env.STORAGE === "mongo") {
  dbConnect().then(() => console.log("Conectado a la db."));
}

//Handlebars:
const { create } = require("express-handlebars");

//Websocket:
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

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
app.use("/", require("./routes/productos.routes"));

const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log("App en http://localhost:" + PORT);
});

//Sockets:
io.on("connection", async (socket) => {
  console.log("Nuevo usuario conectado", socket.id);
  //

  //Enviando mensajes al hacer login:
  const messagesList = await daoMsg.getAll();
  const NM = normalizr.normalize(messagesList, schemaMensajes);

  console.log(util.inspect(NM, true, 10, true));
  await messagesList.reverse();
  io.sockets.emit("messages", messagesList);
  //

  //
  //Mensajes nuevos:
  socket.on("new-msg", async (data) => {
    await daoMsg.save(data);
    io.sockets.emit("messages", messagesList);
  });
});