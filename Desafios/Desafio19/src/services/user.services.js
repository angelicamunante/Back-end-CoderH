const { encrypt } = require("../src/utils/bcryptHandler");
const registerUserServ = async (username, password) => {
  //Si todo está bien hasheamos password:
  const hashPass = await encrypt(password);
  return await User.create({ email: username, password: hashPass });
};

modules.exports = { registerUserServ };