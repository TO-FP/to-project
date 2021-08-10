const express = require("express");
const route = express.Router();

const adminController = require("../controllers/AdminController");
// const adminAuth = require("../middlewares/adminAuth");

route.get("/", adminController.dashboard);

// Users
route.get("/users", adminController.getUsers);

// Products
route.get("/products", adminController.showAllProduct);
route.get("/products/:id", adminController.findById);
route.post("/products/addProduct", adminController.addProduct);
route.put("/products/:id/update", adminController.updateProduct);
route.delete("/products/:id/delete", adminController.deleteProduct);

// Orders

module.exports = route;
