const { containerFirebase } = require("../containers/containerFirebase");

class daoMsgFirebase extends containerFirebase {
  constructor() {
    super("mensajes");
  }
}

module.exports = { daoMsgFirebase };