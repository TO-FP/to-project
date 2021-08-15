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
route.post("/products/:page?", ApiController.productsPage);
route.get("/product-details/:id", ApiController.productDetailsPage);
route.post("/products-by/:UserId/:page?", ApiController.productsByUser);

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

route.put("/check-carts/:id", userAuth, ApiController.cartCheckbox);
// route.get("/carts/:checkbox", userAuth, ApiController.cartCheckboxAll);
route.put("/carts/:id/update-item", userAuth, ApiController.updateCart);
route.delete("/carts/:id/remove-item", userAuth, ApiController.removeItemCart);
route.delete("/carts/:id/remove-cart", userAuth, ApiController.removeCart);

// checkout
route.get("/order-summary", userAuth, ApiController.orderSummary);
route.post("/checkouts", userAuth, ApiController.checkout);

module.exports = route;
