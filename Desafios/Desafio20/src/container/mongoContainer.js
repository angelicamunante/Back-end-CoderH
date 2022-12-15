class mongoContainer {
  constructor(model) {
    this.model = model;
  }
  async listar() {
    throw new Error("método no implementado");
  }
  async crear() {
    throw new Error("método no implementado");
  }
  async buscarPorId() {
    throw new Error("método no implementado");
  }
  static instanciar() {
    let instance = new mongoContainer();
    return instance;
  }
}
module.exports = mongoContainer;