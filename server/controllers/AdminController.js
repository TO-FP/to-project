const { User, Product, Products_image } = require("../models");
const { tokenVerifier } = require("../helpers/jwt");

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
      include: [
        { model: User, attributes: ["email"] },
        { model: Products_image },
      ],
      order: [
        ["id", "ASC"],
        [Products_image, "id", "ASC"],
      ],
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

    Product.findByPk(id, {
      include: [Products_image],
      order: [[Products_image, "id", "ASC"]],
    })
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

  static async addProduct(req, res) {
    const files = req.files;
    const { access_token } = req.headers;
    const decoded = tokenVerifier(access_token);

    const user = await User.findOne({
      where: { email: decoded.email },
    });

    const { name, desc, price, stock, weight, category, brand, condition } =
      req.body;

    Product.create({
      UserId: user.id,
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
        if (files.length > 0) {
          files.forEach((file) => {
            Products_image.create({
              ProductId: product.id,
              fileName: file.filename,
              fileSize: file.size,
              fileType: file.mimetype,
              primary: true,
            });
          });
        } else {
          Products_image.create({
            ProductId: product.id,
            fileName: "product-image-placeholder.png",
            fileSize: "22kb",
            fileType: "jpg",
            primary: true,
          });
        }

        res.status(201).json({
          status: 201,
          message: "Product added successfully!",
          product,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: 500,
          ...err,
        });
      });
  }

  static async updateProduct(req, res) {
    const id = +req.params.id;

    const IMAGES = [];

    const {
      name,
      desc,
      price,
      stock,
      weight,
      category,
      brand,
      IMAGE0,
      IMAGE1,
      IMAGE2,
      IMAGE3,
      condition,
    } = req.body;

    IMAGES.push(IMAGE0 === "true" ? true : false);
    IMAGES.push(IMAGE1 === "true" ? true : false);
    IMAGES.push(IMAGE2 === "true" ? true : false);
    IMAGES.push(IMAGE3 === "true" ? true : false);

    const files = req.files;
    const body = req.body;

    await Product.update(
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
    );

    const productImages = await Products_image.findAll({
      where: { ProductId: 1 },
      order: [["id", "ASC"]],
    });

    let count = 0;

    const object = [];

    IMAGES.forEach(async (IMAGE, index) => {
      if (IMAGE) {
        const fileName = files[count].filename;
        const productId = productImages[index].id;

        object.push({
          fileName,
          productId,
        });
        count++;
      }
    });

    object.forEach(async (obj) => {
      await Products_image.update(
        { fileName: obj.fileName },
        { where: { id: obj.productId } }
      );
    });

    res.status(200).json({
      status: 200,
      message: "Product updated successfully!",
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
