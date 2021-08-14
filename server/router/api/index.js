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
route.get("/home-page", ApiController.homePage);
route.get("/products/:page?", ApiController.productsPage);
route.get("/product-details/:id", ApiController.productDetailsPage);

route.put(
  "/account/update",
  userAuth,
  MulterSingle("./public/images/avatars/"),
  ApiController.updateProfile
);

// bikin add to cart
route.post(
  "/product-details/:id/add-to-cart",
  userAuth,
  ApiController.addToCart
);

route.get("/show-cart", userAuth, ApiController.showCart);

route.get("/carts/:id/:checkbox", userAuth, ApiController.cartCheckbox);
route.get("/carts/:checkbox", userAuth, ApiController.cartCheckboxAll);
route.delete("/carts/:id/remove", userAuth, ApiController.removeCart);
route.get("/checkouts", userAuth, ApiController.checkout);

module.exports = route;
