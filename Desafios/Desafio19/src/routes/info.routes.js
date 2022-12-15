const express = require("express");
const infoRoutes = express.Router();
const compression = require("compression");
const { getInfo, getRandom, errorPage } = require("../controllers/info.ctrl");

infoRoutes.get("/info", compression(), getInfo);
//RUTA API RANDOM~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
infoRoutes.get("/api/random", getRandom);
infoRoutes.get("*", errorPage);
module.exports = { infoRoutes };