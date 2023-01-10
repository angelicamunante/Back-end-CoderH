import { daoCarrito } from "../../dao/daoIndex.js";

export async function listarCarritos() {
  return await daoCarrito.getAll();
}
export async function obtenerCarrito({ id }) {
  return await daoCarrito.getById(id);
}
export async function crearCarrito({ uid }) {
  return await daoCarrito.save(uid);
}
export async function deleteCarrito({ id }) {
  return await daoCarrito.deleteById(id);
}