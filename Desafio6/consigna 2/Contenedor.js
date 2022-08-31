const fs = require('fs/promises');

module.exports = class Contenedor {
  constructor(ruta) {
    this.ruta = './data' + ruta;
  }

  async save(product) {
    try {
      let products = await this.getAll()
        .then(products => { return products })
        .catch(error => { return error })
      // Se usa reduce para determinar el mayor id... Y se le suma 1 para que sea el nuevo id...
      if (products.length === 0) {
        product.id = 1
      } else {
        product.id = products.reduce((max, prd) => { return prd.id > max ? prd.id : max }, 0) + 1
      }
      products.push(product)
      await fs.writeFile(this.filename, JSON.stringify(products))
      return product.id
    } catch (error) {
      console.error(error)
    }
  }

  async getAll() {
    try {
      const objs = await fs.readFile(this.ruta, "utf-8");

      return JSON.parse(objs);
    } catch (error) {
      return [];
    }
  }

  async getById(productId) {
    try {
      const objs = await this.getAll();
      const product = objs.find((obj) => {
        if (obj.id === productId) {
          return obj;
        }
      });

      return product ? product : {};
    } catch (error) {
      console.log("Ocurrió un error en la búsqueda");
    }
  }

  async save(obj) {
    try {
      const objs = await this.getAll();

      let newId;
      if (objs.length == 0) {
        newId = 1;
      } else {
        newId = objs[objs.length - 1].id + 1;
      }

      const newObj = { ...obj, id: newId };
      objs.push(newObj);

      await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
      return newId;
    } catch (error) {
      console.log(error);
      console.log("Error al guardar!");
    }
  }

  async updateById(id, newObj){
    try {
      const objs = await this.getAll();
      const indexObj = objs.findIndex((o)=> o.id == id);
      if (indexObj == -1) {
        return `El producto no fue actualizado porque no se encontró el ID: ${id}`
      } else {
        objs[indexObj] = {id, ...newObj};
      await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
      }
      return {id, ...newObj};
    } catch (error) {
      return `Error al actualizar`
    }
  }

  async deleteById(id) {
    try {
      const objs = await this.getAll();
      const indexObj = objs.findIndex((o) => o.id == id);

      if (indexObj == -1) {
        return `El producto no fue borrado porque no se encontró el ID: ${id}`;
      } else {
        objs.splice(indexObj, 1);
        await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
      }
    } catch (error) {
      return 'Ocurrió un error al eliminar el producto.'
    }
  }

  async deleteAll() {
    try {
      await fs.writeFile(this.ruta, "");
    } catch (error) {
      console.log("No se eliminaron");
    }
  }
}
