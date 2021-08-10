const express = require("express");
const route = express.Router();

const adminController = require("../controllers/AdminController");
const adminAuth = require("../middlewares/adminAuth");

route.post("/", adminAuth, adminController.dashboard);
route.get("/users", adminController.getUsers);
route.get("/products", adminController.showAllProduct)
route.get("/products/:id", adminController.findById)
route.post("/products/addProduct", adminController.addProduct)

module.exports = route;
