import { daoProductos } from "../../dao/daoIndex.js";

export async function listarProductos() {
  return await daoProductos.getAll();
}
export async function crearProducto({ datos }) {
  return await daoProductos.save(datos);
}
export async function obtenerProducto({ id }) {
  return await daoProductos.getById(id);
}
export async function updateProducto({ id, datos }) {
  return await daoProductos.updateOne(id, datos);
}
export async function deleteProducto({ id }) {
  return await daoProductos.deleteById(id);
}