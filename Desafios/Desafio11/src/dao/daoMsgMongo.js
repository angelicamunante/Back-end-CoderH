const Mensajes = require("../models/Mensajes.models");
const { containerMongo } = require("../containers/containerMongo");

class daoMsgMongo extends containerMongo {
  constructor() {
    super(Mensajes);
  }
}

module.exports = { daoMsgMongo };