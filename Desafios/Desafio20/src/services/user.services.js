const { encrypt } = require("../src/utils/bcryptHandler");
const userDao = require("../database/dao/userDao");
const dao = userDao.instanciar();
const registerUserServ = async (username, password) => {
  //Si todo está bien hasheamos password:
  const hashPass = await encrypt(password);
  return await dao.crear(username, hashPass);
};

modules.exports = { registerUserServ };