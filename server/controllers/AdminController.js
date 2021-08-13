const { User, Product, Products_image } = require("../models");

class AdminController {
  static dashboard(req, res) {
    res.status(200).json({
      status: 200,
      message: "Admin validated.",
    });
  }

  static findAllUser(req, res) {
    User.findAll()
      .then((users) => {
        res.status(200).json({
          status: 200,
          message: "Users displayed successfully!",
          users,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static findAllProduct(req, res) {
    Product.findAll({
      include: [{ model: User, attributes: ["email"] }, Products_image],
      order: [["id", "ASC"]],
    })
      .then((products) => {
        res.status(200).json({
          status: 200,
          message: "Products displayed successfully!",
          products,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static findOneProduct(req, res) {
    const id = +req.params.id;

    Product.findByPk(id)
      .then((product) => {
        if (product) {
          res.status(200).json({
            status: 200,
            message: "Product displayed successfully!",
            product,
          });
        } else {
          throw {
            status: 404,
            message: "Product not found!",
          };
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static addProduct(req, res) {
    const {
      name,
      desc,
      price,
      stock,
      weight,
      category,
      brand,
      condition,
      images,
    } = req.body;

    Product.create({
      UserId: req.userData.id,
      name,
      desc,
      price,
      stock,
      weight,
      category,
      brand,
      condition,
    })
      .then((product) => {
        images.forEach((img) => {
          Products_image.create({
            ProductId: product.id,
            fileName: img.fileName,
            fileSize: img.fileSize,
            fileType: img.fileType,
            primary: img.primary,
          });
        });
        res.status(201).json({
          status: 201,
          message: "Product added successfully!",
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static updateProduct(req, res) {
    const id = +req.params.id;
    const { name, desc, price, stock, weight, category, brand, condition } =
      req.body;

    Product.update(
      {
        name,
        desc,
        price,
        stock,
        weight,
        category,
        brand,
        condition,
      },
      { where: { id } }
    )
      .then(() => {
        res.status(200).json({
          status: 200,
          message: "Product updated successfully!",
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static deleteProduct(req, res) {
    const id = +req.params.id;

    Product.destroy({ where: { id } })
      .then(() => {
        res.status(200).json({
          status: 200,
          message: "Product deleted successfully!",
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}

module.exports = AdminController;
