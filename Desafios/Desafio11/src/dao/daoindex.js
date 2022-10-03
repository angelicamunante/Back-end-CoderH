const { daoMsgArchivos } = require("./daoMsgArchivos");
const { daoMsgFirebase } = require("./daoMsgFirebase");
const { daoMsgMongo } = require("./daoMsgMongo");

//LÓGICAS DE LOS DAOS:

let daoMsg;

const STORAGE = process.env.STORAGE;

if (STORAGE === "archivos") {
  daoMsg = new daoMsgArchivos();
} else if (STORAGE === "firebase") {
  daoMsg = new daoMsgFirebase();
} else if (STORAGE === "mongo") {
  daoMsg = new daoMsgMongo();
}

module.exports = daoMsg;