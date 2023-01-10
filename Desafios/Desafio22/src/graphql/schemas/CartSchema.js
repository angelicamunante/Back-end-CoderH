import { buildSchema } from "graphql";
export const carritoSchema = new buildSchema(`
type carrito{
  id:ID!,
products: [String],
user : String
}
type Query{
  listarCarritos : [carrito]
  obtenerCarrito(id:ID!) : carrito
}
type Mutation{
  crearCarrito(id:ID!) : carrito
  deleteCarrito(id:ID!) : carrito
}
`);