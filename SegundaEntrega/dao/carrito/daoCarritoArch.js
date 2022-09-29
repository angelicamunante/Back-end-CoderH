import containerArchivos from "../../containers/containerArchivos.js";

class daoCarritoArchivos extends containerArchivos {
  constructor() {
    super("carrito.txt");
  }
}

export default daoCarritoArchivos;