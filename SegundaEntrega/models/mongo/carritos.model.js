import { Schema, model } from "mongoose";

const carritoSchema = new Schema(
  {
    products: [],
  },
  {
    timestamps: true,
  }
);

const Carrito = new model("carritos", carritoSchema);

export default Carrito;