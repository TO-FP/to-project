const { Op } = require("sequelize");

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

  static async findAllProduct(req, res) {
    let { name, sort, page } = req.params;

    if (!name) name = " ";
    if (!page) page = 1;

    const limit = 5;

    let order = [];

    if (sort === "newest") {
      order = ["createdAt", "ASC"];
    } else if (sort === "oldest") {
      order = ["createdAt", "DESC"];
    } else if (sort === "low-price") {
      order = ["price", "ASC"];
    } else if (sort === "high-price") {
      order = ["price", "DESC"];
    } else if (sort === "total-sold") {
      order = ["totalSold", "ASC"];
    } else if (sort === "rating") {
      order = ["rating", "ASC"];
    } else {
      order = ["id", "ASC"];
    }

    const totalProduct = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: "%" + name + "%",
        },
      },
    });
    const totalPage = Math.ceil(totalProduct.length / limit);
    const offset = (page - 1) * limit;

    try {
      const products = await Product.findAll({
        offset,
        limit,
        include: [
          { model: User, attributes: ["name", "email"] },
          {
            model: Products_image,
            attributes: ["fileName", "primary"],
          },
        ],
        where: {
          name: {
            [Op.iLike]: "%" + name + "%",
          },
        },
        order: [order],
      });
      res.status(200).json({
        status: 200,
        totalProduct: totalProduct.length,
        totalPage,
        products,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async findMyProduct(req, res) {
    const UserId = req.userData.id;
    let { name, sort, page } = req.params;

    if (!page) page = 1;

    const limit = 5;

    let order = [];

    if (sort === "newest") {
      order = ["createdAt", "ASC"];
    } else if (sort === "oldest") {
      order = ["createdAt", "DESC"];
    } else if (sort === "low-price") {
      order = ["price", "ASC"];
    } else if (sort === "high-price") {
      order = ["price", "DESC"];
    } else if (sort === "total-sold") {
      order = ["totalSold", "ASC"];
    } else if (sort === "rating") {
      order = ["rating", "ASC"];
    } else {
      order = ["id", "ASC"];
    }

    try {
      const totalProduct = await Product.findAll({
        where: {
          UserId,
          name: {
            [Op.iLike]: "%" + name + "%",
          },
        },
      });
      const totalPage = Math.ceil(totalProduct.length / limit);
      const offset = (page - 1) * limit;

      const products = await Product.findAll({
        offset,
        limit,
        include: [
          { model: User, attributes: ["name", "email"] },
          {
            model: Products_image,
            attributes: ["fileName", "primary"],
          },
        ],
        where: {
          UserId,
          name: {
            [Op.iLike]: "%" + name + "%",
          },
        },
        order: [order],
      });
      res.status(200).json({
        status: 200,
        totalProduct: totalProduct.length,
        totalPage,
        products,
      });
    } catch (err) {
      res.status(500).json(err);
    }
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

    const body = req.body;

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
        // res.json({ status: 500, error: "ERROR BROOO!" });
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

    const shoppingCarts = await Shopping_cart.findAll();

    shoppingCarts.forEach(async (shoppingCart) => {
      const total_line_item = await Line_item.findAll({
        where: { ShoppingCartId: shoppingCart.id, status: "cart" },
      });

      if (total_line_item.length === 1) {
        await Shopping_cart.destroy({
          where: { id: shoppingCart.id },
        });
      }

      await Line_item.destroy({
        where: { ProductId: id, status: "cart" },
      });
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
    const status = req.params.status;

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
        where: {
          status: {
            [Op.ne]: "open",
          },
          [Op.or]:
            status === "all"
              ? [
                  { status: "cancelled" },
                  { status: "paid" },
                  { status: "shipping" },
                  { status: "closed" },
                ]
              : { status },
        },
        order: [["id", "DESC"]],
      });

      res.status(200).json({
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

      res.status(200).json({
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

    try {
      await Order.update(
        {
          status,
        },
        {
          where: { name: `HS-INV/${name}` },
        }
      );

      await Line_item.update(
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

      const line_items = await Line_item.findAll({
        where: { OrderName: `HS-INV/${name}` },
      });

      line_items.forEach(async (line_item) => {
        const product = await Product.findByPk(line_item.ProductId);
        if (status === "cancelled") {
          await Product.update(
            {
              stock: product.stock + line_item.qty,
            },
            { where: { id: product.id } }
          );
        }
      });

      res.status(200).json({
        status: 200,
        message: "Transaction confirmation success!",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = AdminController;
