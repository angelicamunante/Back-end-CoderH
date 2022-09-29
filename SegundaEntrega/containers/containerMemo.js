class containerMemo {
  constructor() {
    this.listObjects = [];
  }

  getAll() {
    return this.listObjects;
  }

  save(object) {
    let timestamp = new Date().toDateString();
    let id = this.listObjects.length + 1;
    const newObject = { ...object, id, timestamp };
    this.listObjects.push(newObject);
    return this.listObjects;
  }

  getById(id) {
    const list = this.listObjects;
    const filterObject = list.filter((item) => item.id == id);
    const object = filterObject[0];
    if (!object) return "No se encontró el objeto solicitado.";
    return object;
  }

  updateOne(id, object) {
    let timestamp = new Date().toDateString();
    const list = this.listObjects;
    let filterObject = list.filter((item) => item.id == id);
    let newObject = filterObject[0];
    newObject = { id, timestamp, ...object };
    const objectListUpdated = list.map((item) =>
      item.id == newObject.id ? (item = newObject) : item
    );
    this.listObjects = objectListUpdated;
  }

  deleteById(id) {
    const list = this.listObjects;
    const object = this.getById(id);
    if (object === "No se encontró el objeto solicitado.") return object;
    const filteredList = list.filter((item) => item.id != id);
    this.listObjects = filteredList;
  }

  postById(idc, object) {
    const list = this.listObjects;
    const filteredList = list.filter((item) => item.id == idc);
    const cartFiltered = filteredList[0];
    if (!cartFiltered) return "no existe el carrito";
    cartFiltered.products.push(object);
    const cartUpdated = list.map((item) =>
      item.id == idc ? (item = cartFiltered) : item
    );
    this.listObjects = cartUpdated;
    return true;
  }

  selectedDelete(idc, idp) {
    const list = this.listObjects;
    const cartFiltered = list.filter((item) => item.id == idc);
    if (!cartFiltered) throw new Error("No se encontró el carrito");
    const newCart = cartFiltered[0];
    const arrayProducts = newCart.products.filter((item) => item.id != idp);
    newCart.products = arrayProducts;
    const cartUpdated = list.map((item) => (item.id == idc ? newCart : item));
    this.listObjects = cartUpdated;
    return true;
  }
}

export default containerMemo;