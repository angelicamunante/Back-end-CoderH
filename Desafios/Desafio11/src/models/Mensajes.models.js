const { model, Schema } = require("mongoose");

const mensajesSchema = new Schema({
  author: {
    email: {
      type: String,
    },
    nombre: {
      type: String,
    },
    apellido: {
      type: String,
    },
    edad: {
      type: Number,
    },
    alias: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  text: {
    type: String,
  },
});

const Mensajes = new model("mensajes", mensajesSchema);

module.exports = Mensajes;