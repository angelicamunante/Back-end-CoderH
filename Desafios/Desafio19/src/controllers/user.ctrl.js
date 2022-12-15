const { logger } = require("../config/log");

/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~**/
const infoUserCtrl = (req, res) => {
  const userData = req.user;
  logger.info(`Método GET: ruta "/"`);
  console.log(userData);
  res.render("index", { userData });
};
/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~**/
const registerUserGetCtrl = (req, res) => {
  logger.info(`Método GET: ruta "/register"`);
  res.render("register");
};
/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~**/
const loginUserCtrl = (req, res) => {
  logger.info(`Método GET: ruta "/login"`);
  res.render("login");
};
/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~**/
const registerUserPostCtrl = async (req, res) => {
  logger.info(`Método POST: ruta "/register"`);
  const { username, password } = req.body;

  //Si está vacío el formulario:
  if (!username.trim() || !password.trim())
    return res.status(400).send("FIELDS_REQUIRED");
  //Si el usuario ya existe:
  const checkEmail = await User.findOne({ email: username });
  if (checkEmail) {
    return res.status(400).send("USER_ALREADY_EXISTS");
  }

  //Service:
  await registerUserServ(username, password);
  return res.status(201).redirect("/login");
};
/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~**/
const errorLoginCtrl = (req, res) => {
  logger.info(`Método GET: ruta "/errorLogin"`);
  logger.error(`Método GET: ERROR: ruta "/errorLogin"`);
  return res.render("errorLogin");
};
/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~**/
const logoutCtrl = (req, res) => {
  logger.info(`Método GET: ruta "/logout"`);
  req.session.destroy((err) => {
    if (err) {
      res.json({ err });
    } else {
      res.redirect("/");
    }
  });
};

module.exports = {
  infoUserCtrl,
  registerUserGetCtrl,
  loginUserCtrl,
  registerUserPostCtrl,
  errorLoginCtrl,
  logoutCtrl,
};