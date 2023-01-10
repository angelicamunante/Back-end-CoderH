import { buildSchema } from "graphql";

export const productGQLSchema = new buildSchema(`
input ProductoInput{
  name: String,
  description: String,
  code: String,
  image: String,
  price: Int,
  stock: Int,
}
type Producto {
  id: ID!,
  name: String,
  description: String,
  code: String,
  image: String,
  price: Int,
  stock: Int,
}
type Query{
  listarProductos: [Producto]
  obtenerProducto(id:ID!) : Producto
}
type Mutation{
  crearProducto(datos:ProductoInput) : Producto
  updateProducto(id:ID!,datos:ProductoInput):Producto
  deleteProducto(id:ID!):Producto
}`);