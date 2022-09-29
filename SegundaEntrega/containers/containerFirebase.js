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

  async save(object) {
    try {
      let doc = this.model.doc();
      const resCreate = await doc.create(object);
    } catch (error) {
      console.log(e);
    }
  }

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

  async updateOne(id, object) {
    try {
      const doc = this.model.doc(`${id}`);
      const item = await doc.update(object);
      return item;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteById(id) {
    try {
      const doc = this.model.doc(`${id}`);
      const item = await doc.delete();
      return item;
    } catch (e) {
      console.log(e);
    }
  }

  async postById(idc, object) {
    try {
      const carrito = await this.getById(idc);
      if (!carrito) throw new Error("No se encontró el carrito");
      carrito.products.push(object);
      await this.updateOne(carrito.id, carrito);
      return true;
    } catch (e) {
      console.log(e);
    }
  }

  async selectedDelete(idc, idp) {
    try {
      const carrito = await this.getById(idc);
      if (!carrito) throw new Error("No se encontró el carrito");
      const arrayProducts = carrito.products.filter((item) => item.id !== idp);
      carrito.products = arrayProducts;
      await this.updateOne(carrito.id, carrito);
      return true;
    } catch (e) {
      console.log(e);
    }
  }
}

export default containerFirebase;