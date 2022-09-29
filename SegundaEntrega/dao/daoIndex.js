import daoCarritoArchivos from "./carrito/daoCarritoArch.js";
import daoProductosArchivos from "./producto/daoProductosArch.js";
import daoProductosMongo from "./producto/daoProductosMong.js";
import daoCarritoMongo from "./carrito/daoCarritoMong.js";
import daoCarritoFB from "./carrito/daoCarritoFB.js";
import daoProductosFB from "./producto/daoProductosFB.js";
import daoProductoMemo from "./producto/daoProductomemo.js";
import daoCarritoMemo from "./carrito/daoCarritoMemo.js";

let daoProductos;
let daoCarrito;
const STORAGE = process.env.STORAGE;
console.log(STORAGE);
if (STORAGE === "archivos") {
  daoProductos = new daoProductosArchivos();
  daoCarrito = new daoCarritoArchivos();
} else if (STORAGE === "mongo") {
  daoCarrito = new daoCarritoMongo();
  daoProductos = new daoProductosMongo();
} else if (STORAGE === "firebase") {
  daoCarrito = new daoCarritoFB();
  daoProductos = new daoProductosFB();
} else if (STORAGE === "memoria") {
  daoCarrito = new daoCarritoMemo();
  daoProductos = new daoProductoMemo();
}
export { daoProductos, daoCarrito };