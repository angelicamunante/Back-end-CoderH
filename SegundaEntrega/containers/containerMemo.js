class containerMemo {
  constructor() {
    this.listObjects = [];
  }
  //LISTAR:
  getAll() {
    return this.listObjects;
  }

  //CREAR:
  save(object) {
    //Generamos los datos necesarios:
    let timestamp = new Date().toDateString();
    let id = this.listObjects.length + 1;
    //Configuramos el nuevo objeto:
    const newObject = { ...object, id, timestamp };
    //Lo guardamos en la db:
    this.listObjects.push(newObject);
    return this.listObjects;
  }

  //OBTENER POR ID:
  getById(id) {
    const list = this.listObjects;
    //Filtramos el objeto por id:
    const filterObject = list.filter((item) => item.id == id);
    //Lo asignamos a una variable:
    const object = filterObject[0];
    if (!object) return "No se encontró el objeto solicitado.";
    //Lo retornamos:
    return object;
  }
  //ACTUALIZAR:
  updateOne(id, object) {
    let timestamp = new Date().toDateString();
    const list = this.listObjects;
    //Filtramos el objecto:
    let filterObject = list.filter((item) => item.id == id);
    //Lo asignamos a una variable
    let newObject = filterObject[0];
    //Lo actualizamos:
    newObject = { id, timestamp, ...object };
    //lo guardamos:
    const objectListUpdated = list.map((item) =>
      item.id == newObject.id ? (item = newObject) : item
    );
    this.listObjects = objectListUpdated;
  }
  //BORRAR:
  deleteById(id) {
    const list = this.listObjects;
    const object = this.getById(id);
    //Checkeamos que exista:
    if (object === "No se encontró el objeto solicitado.") return object;
    //Si es que existe lo eliminamos:
    const filteredList = list.filter((item) => item.id != id);
    //guardamos la nueva lista:
    this.listObjects = filteredList;
  }

  //GUARDAR MEDIANTE ID:
  postById(idc, object) {
    //idc: id del carrito
    //object: producto a agregar al carrito.
    const list = this.listObjects;
    const filteredList = list.filter((item) => item.id == idc);
    //filtramos el carrito:
    const cartFiltered = filteredList[0];
    if (!cartFiltered) return "no existe el carrito";
    //guardamos el producto en el carrito:
    cartFiltered.products.push(object);
    //incorporamos el carrito nuevamente en la lista:
    const cartUpdated = list.map((item) =>
      item.id == idc ? (item = cartFiltered) : item
    );
    //lo guardamos en la db:
    this.listObjects = cartUpdated;
    return true;
  }

  //ELIMINAR DEL CARRITO:
  selectedDelete(idc, idp) {
    const list = this.listObjects;
    const cartFiltered = list.filter((item) => item.id == idc);
    if (!cartFiltered) throw new Error("No se encontró el carrito");

    //Eliminamos el producto del carrito:
    const newCart = cartFiltered[0];
    const arrayProducts = newCart.products.filter((item) => item.id != idp);
    newCart.products = arrayProducts;

    //Incorporamos el carrito a la lista de carritos:
    const cartUpdated = list.map((item) => (item.id == idc ? newCart : item));
    this.listObjects = cartUpdated;
    return true;
  }
}

export default containerMemo;