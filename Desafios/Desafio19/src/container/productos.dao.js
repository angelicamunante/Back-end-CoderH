/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
DATABASE EN MEMORIA 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
let PRODUCTOS_LISTA = [
  {
    id: 1,
    title: "Lapiz",
    price: "100",
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-128.png",
  },
  {
    id: 2,
    title: "calculadora",
    price: "400",
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png",
  },
];
class daoProductosContainer {
  constructor(lista) {
    this.lista = lista;
  }

  listProductos() {
    return this.lista;
  }

  crearProducto(title, price, thumbnail) {
    let id = this.lista.length + 1;
    this.lista.push({ id, title, price, thumbnail });
    return this.lista;
  }
}

const daoProductos = new daoProductosContainer(PRODUCTOS_LISTA);
module.exports = { daoProductos };