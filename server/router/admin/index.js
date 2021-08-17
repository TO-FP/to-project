const express = require("express");
const route = express.Router();
const { MulterArray } = require("../../multer");
const { productAuth, multerMiddleware } = require("../../middlewares/admin");

const AdminController = require("../../controllers/AdminController");

route.get("/", AdminController.dashboard);

// Users
route.get("/users", AdminController.findAllUser);

// Products
route.get("/products/:name?/:sort?/:page?", AdminController.findAllProduct);
route.get("/my-products/:name?/:sort?/:page?", AdminController.findMyProduct);
route.get("/products-details/:id", AdminController.findOneProduct);
route.post("/products-add", MulterArray(), AdminController.addProduct);

route.get("/products-auth/:id", productAuth, (req, res) => {
  try {
    res.json({
      status: 200,
      message: "You have permission",
    });
  } catch (err) {
    res.json(err);
  }
});

route.put(
  "/products/:id/update",
  productAuth,
  MulterArray(),
  AdminController.updateProduct
);

route.delete(
  "/products/:id/delete",
  productAuth,
  AdminController.deleteProduct
);

// Orders

route.get("/orders/:status?", AdminController.findAllOrder);
route.get("/order-details/:name", AdminController.findOneOrder);
route.put(
  "/change-status-order/:name/:status",
  AdminController.changeStatusOrder
);

module.exports = route;
