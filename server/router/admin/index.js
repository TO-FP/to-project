const express = require("express");
const route = express.Router();
const { MulterArray } = require("../../multer");
const { productAuth } = require("../../middlewares/admin");

const AdminController = require("../../controllers/AdminController");

route.get("/", AdminController.dashboard);

// Users
route.get("/users", AdminController.findAllUser);

// Products
route.get("/products", AdminController.findAllProduct);
route.get("/products/:id", AdminController.findOneProduct);
route.post(
  "/products/add",
  MulterArray("./public/images/"),
  AdminController.addProduct
);
route.put("/products/:id/update", productAuth, AdminController.updateProduct);
route.delete(
  "/products/:id/delete",
  productAuth,
  AdminController.deleteProduct
);

// Orders

module.exports = route;
