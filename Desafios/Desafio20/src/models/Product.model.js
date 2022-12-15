const mongoose = require("mongoose");

const ProductoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
});
const Producto = mongoose.model("Product", ProductoSchema);
module.exports = Producto;