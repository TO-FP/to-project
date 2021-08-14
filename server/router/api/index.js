const express = require("express");
const route = express.Router();
const { MulterSingle } = require("../../multer");
const { userAuth } = require("../../middlewares");

const ApiController = require("../../controllers/ApiController");

route.post(
  "/register",
  MulterSingle("./public/images/avatars/"),
  ApiController.register
);
route.post("/login", ApiController.login);
route.post("/add-to-cart", ApiController.AddToCart);
route.get("/home-page", ApiController.homePage);
route.get("/products/:page?", ApiController.productsPage);
route.get("/product-details/:id", ApiController.productDetailsPage);

route.put(
  "/account/update",
  userAuth,
  MulterSingle("./public/images/avatars/"),
  ApiController.updateProfile
);
// route.post("/account/update", ApiController.updateProfile);

module.exports = route;
