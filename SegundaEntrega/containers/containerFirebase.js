import admin from "firebase-admin";
import serviceAccount from "../ctr/segunda-entrega-c4139-firebase-adminsdk-ud7e9-568ebe1878.json" assert { type: "json" };

if (process.env.STORAGE === "firebase") {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

class containerFirebase {
  constructor(collection) {
    this.db = admin.firestore();
    this.model = this.db.collection(collection);
  }

  //listar:
  async getAll() {
    try {
      const res = await this.model.get();
      let docs = res.docs;
      const list = docs.map((item) => ({ id: item.id, ...item.data() }));
      return list;
    } catch (e) {
      console.log(e);
    }
  }

  //crear:
  async save(object) {
    try {
      let doc = this.model.doc();
      const resCreate = await doc.create(object);
    } catch (error) {
      console.log(e);
    }
  }

  //Traer por ID:
  async getById(id) {
    try {
      const doc = this.model.doc(`${id}`);
      const item = await doc.get();
      const res = { id: item.id, ...item.data() };
      return res;
    } catch (e) {
      console.log(e);
    }
  }

  //Actualizar:
  async updateOne(id, object) {
    try {
      const doc = this.model.doc(`${id}`);
      const item = await doc.update(object);
      return item;
    } catch (e) {
      console.log(e);
    }
  }
  //Eliminar por ID:
  async deleteById(id) {
    try {
      const doc = this.model.doc(`${id}`);
      const item = await doc.delete();
      return item;
    } catch (e) {
      console.log(e);
    }
  }
  //Guardar producto en el carrito:
  async postById(idc, object) {
    //idc: id del carrito
    //object: producto a agregar al carrito
    try {
      const carrito = await this.getById(idc);
      if (!carrito) throw new Error("No se encontró el carrito");
      carrito.products.push(object);
      //Ahora lo guardamos en la db de nuevo:
      await this.updateOne(carrito.id, carrito);
      return true;
    } catch (e) {
      console.log(e);
    }
  }
  //Eliminar producto de un carrito:
  async selectedDelete(idc, idp) {
    //idc: id del carrito.
    //idp: id del producto.
    try {
      const carrito = await this.getById(idc);
      if (!carrito) throw new Error("No se encontró el carrito");
      //Quitamos el producto:
      const arrayProducts = carrito.products.filter((item) => item.id !== idp);
      //Guardamos la lista de productos actualizada:
      carrito.products = arrayProducts;
      //Guardamos el  carrito en la db:
      await this.updateOne(carrito.id, carrito);
      return true;
    } catch (e) {
      console.log(e);
    }
  }
}

export default containerFirebase;