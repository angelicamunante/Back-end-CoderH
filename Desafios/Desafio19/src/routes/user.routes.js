const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const {
  infoUserCtrl,
  registerUserGetCtrl,
  loginUserCtrl,
  registerUserPostCtrl,
  errorLoginCtrl,
  logoutCtrl,
} = require("../controllers/user.ctrl");
/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
ROUTES 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

//RUTAS LOGIN REGISTER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

userRouter.get("/", infoUserCtrl);
userRouter.get("/register", registerUserGetCtrl);
userRouter.get("/login", loginUserCtrl);

//POST - REGISTER
userRouter.post("/register", registerUserPostCtrl);
//POST - LOGIN
userRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/errorlogin",
  })
);

userRouter.get("/errorlogin", errorLoginCtrl);

userRouter.get("/logout", logoutCtrl);

module.exports = { userRouter };