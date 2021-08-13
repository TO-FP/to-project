const express = require("express");
const route = express.Router();

const ApiController = require("../../controllers/ApiController");

route.post("/register", ApiController.register);
route.post("/login", ApiController.login);
route.get("/home-page", ApiController.homePage);
route.get("/products", ApiController.productsPage);
route.get("/product-details/:id", ApiController.productDetailsPage);

module.exports = route;
