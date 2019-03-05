const express = require("express");
const multerConfig = require("./config/multer");

const upload = require("multer")(multerConfig);

const routes = express.Router();

const UserController = require("./app/controllers/UserController");

// routes.get('/', (req, res) => res.render('auth/signup'))
routes.get("/signup", UserController.create);
routes.post("/signup", UserController.store);

module.exports = routes;
