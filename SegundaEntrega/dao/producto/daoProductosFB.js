import containerFirebase from "../../containers/containerFirebase.js";

class daoProductosFB extends containerFirebase {
  constructor() {
    super("productos");
  }
}

export default daoProductosFB;