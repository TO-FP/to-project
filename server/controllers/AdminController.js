const {
  User,
  Product,
  Products_image,
  Order,
  Line_item,
  Shopping_cart,
} = require("../models");
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
        for (let i = 0; i < 4; i++) {
          const fileName = files[i]
            ? files[i].filename
            : "product-image-placeholder.png";
          const fileSize = files[i] ? files[i].size : "22kb";
          const fileType = files[i] ? files[i].mimetype : ".png";
          const primary = i === 0 ? true : false;

          Products_image.create({
            ProductId: product.id,
            fileName,
            fileSize,
            fileType,
            primary,
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

    try {
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
        where: { ProductId: id },
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
        object,
        message: "Product updated successfully!",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async deleteProduct(req, res) {
    const id = +req.params.id;

    await Products_image.destroy({
      where: { ProductId: id },
    });

    await Product.destroy({ where: { id } })
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

  static async findAllOrder(req, res) {
    const userId = req.userData.id;

    try {
      const order = await Order.findAll({
        include: [
          {
            model: Line_item,
            include: [
              {
                model: Product,
                where: { UserId: userId },
              },
            ],
          },
        ],
      });

      res.json({
        status: 200,
        message: " Data orders has been displayed successfully!",
        order,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async findOneOrder(req, res) {
    const userId = req.userData.id;
    const name = `HS-INV/${req.params.name}`;

    try {
      const order = await Order.findAll({
        include: [
          {
            model: Line_item,
            include: [
              {
                model: Product,
                where: { UserId: userId },
                include: [
                  {
                    model: Products_image,
                  },
                ],
              },
            ],
          },
          { model: User },
        ],
        where: { name },
      });

      res.json({
        status: 200,
        message: " Order details has been displayed successfully!",
        order,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async changeStatusOrder(req, res) {
    const name = req.params.name;
    const status = req.params.status;

    await Order.update(
      {
        status,
      },
      {
        where: { name: `HS-INV/${name}` },
      }
    );

    Line_item.update(
      {
        status:
          status === "paid"
            ? "ordered"
            : status === "cancelled"
            ? status
            : status === "closed" && status,
      },
      {
        where: { OrderName: `HS-INV/${name}` },
      }
    );

    res.json({
      status: 200,
      message: "Transaction confirmation success!",
    });
  }
}

module.exports = AdminController;
