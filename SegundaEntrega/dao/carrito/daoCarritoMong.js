import containerMongo from "../../containers/containerMongo.js";
import Carrito from "../../models/mongo/carritos.model.js";

class daoCarritoMongo extends containerMongo {
  constructor() {
    super(Carrito);
  }
}

export default daoCarritoMongo;