const fs = require("fs/promises");

class Contenedor {
  constructor(ruta) {
    this.ruta = ruta;
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

  async deleteById(id) {
    try {
      const objs = await this.getAll();
      const indexObj = objs.findIndex((o) => o.id == id);

      if (indexObj == -1) {
        return "Elemento no encontrado";
      } else {
        objs.splice(indexObj, 1);
        await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
      }
    } catch (error) {
      console.log("No se eliminó");
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

async function main() {
  const contenedor = new Contenedor("./Desafios/Desafio/productos.txt");
  // console.log(contenedor.ruta);
  // console.log(await contenedor.getAll());
  // console.log(await contenedor.getById(2));
  // console.log(await contenedor.save({ title: "JavaScript01", price: 230, thumbnail: "https://www.coderhouse.com.pe/javascript" }));
  // console.log(await contenedor.save({title:"JavaScript05", price: 300,thumbnail: "https://www.coderhouse.com.pe/javascript"}));
  // console.log(await contenedor.deleteById(1));
  // console.log(await contenedor.deleteAll());
}
main();
