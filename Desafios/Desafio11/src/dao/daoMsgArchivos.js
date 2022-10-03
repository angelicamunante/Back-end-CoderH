const { containerArchivos } = require("../containers/containerArchivos");

class daoMsgArchivos extends containerArchivos {
  constructor() {
    super("mensajes.txt");
  }
}

module.exports = { daoMsgArchivos };