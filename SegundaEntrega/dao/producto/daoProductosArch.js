import containerArchivos from "../../containers/containerArchivos.js";

class daoProductosArchivos extends containerArchivos {
  constructor() {
    super("productos.txt");
  }
}

export default daoProductosArchivos;