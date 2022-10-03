class containerMongo {
  constructor(model) {
    this.model = model;
  }

  //Listar:
  async getAll() {
    try {
      const productList = await this.model.find({});
      return productList;
    } catch (e) {
      console.log(e);
    }
  }

  //Crear
  async save(object) {
    try {
      const resCreate = await this.model.create(object);
      return resCreate;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = { containerMongo };