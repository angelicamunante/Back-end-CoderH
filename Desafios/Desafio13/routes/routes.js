const express = require("express");
const router = express.Router();
const passport = require("passport");
const { encrypt, verified } = require("../utils/bcryptHandler");
const User = require("../models/User.model");

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
DATABASE EN MEMORIA 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
let PRODUCTOS_LISTA = [
  {
    id: 1,
    title: "React Js",
    price: "200",
    thumbnail:
      "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png",
  },
  {
    id: 2,
    title: "JavaScript",
    price: "400",
    thumbnail:
      "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/187_Js_logo_logos-512.png",
  },
];

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
MIDDLEWARES 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
ROUTES 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

//RUTAS LOGIN REGISTER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

router.get("/", (req, res) => {
  const userData = req.user;
  console.log(userData);
  res.render("index", { userData });
});
router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/login", (req, res) => {
  res.render("login");
});

//POST - REGISTER
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  //Si está vacío el formulario:
  if (!username.trim() || !password.trim())
    return res.status(400).send("FIELDS_REQUIRED");
  //Si el usuario ya existe:
  const checkEmail = await User.findOne({ email: username });
  if (checkEmail) {
    return res.status(400).send("USER_ALREADY_EXISTS");
  }
  //Si todo está bien hasheamos password:
  const hashPass = await encrypt(password);
  await User.create({ email: username, password: hashPass });
  return res.status(201).redirect("/login");
});
//POST - LOGIN
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/errorlogin",
  })
);

router.get("/errorlogin", (req, res) => {
  return res.render("errorLogin");
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.json({ err });
    } else {
      res.redirect("/");
    }
  });
});

//
//
//
//
// RUTAS PRODUCTOS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//Ruta crear productos:

router.get("/crear", (req, res) => {
  return res.render("create");
});

//obtener todos los productos:
router.get("/productos", (req, res) => {
  res.render("productos", { productos: PRODUCTOS_LISTA });
});

//Agregar un producto:
router.post("/productos", (req, res) => {
  const { title, price, thumbnail } = req.body;

  const productoCheck = PRODUCTOS_LISTA.filter((item) => item.title === title);
  if (productoCheck.length !== 0) {
    return res
      .status(400)
      .json({ error: "El producto ya se encuentra en la base de datos" });
  }

  if (!title.trim() || !price.trim() || !thumbnail.trim()) {
    return res.status(400).json({ error: "Todos los campos son requeridos." });
  }

  let id = PRODUCTOS_LISTA.length + 1;
  PRODUCTOS_LISTA.push({ id, title, price, thumbnail });
  return res.redirect("/");
});

module.exports = router;