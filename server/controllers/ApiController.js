const {
  User,
  Product,
  Products_image,
  Shopping_cart,
  Line_item,
} = require("../models");
const bcrypt = require("bcrypt");
const { decrypter } = require("../helpers/bcrypt");
const { tokenGenerator, tokenVerifier } = require("../helpers/jwt");

class ApiController {
  static async register(req, res) {
    const file = req.file;
    const { name, email, password, gender, birthdate, type } = req.body;
    const salt = bcrypt.genSaltSync(10);

    try {
      await User.create({
        name,
        email,
        password,
        salt,
        gender,
        birthdate,
        avatar: file ? file.filename : "blank.png",
        type,
      });
      res.status(201).json({
        status: 201,
        message: "New user has been created!",
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        ...err,
      });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (user) {
        const hashPassword = user.password;
        const isMatch = decrypter(password, hashPassword);

        if (isMatch) {
          const access_token = tokenGenerator(user.dataValues);
          res.status(200).json({
            status: 200,
            message: "You are successfully logged in",
            user,
            access_token,
          });
        } else {
          throw {
            status: 403,
            message: "Password is invalid!",
          };
        }
      } else {
        throw {
          status: 404,
          message: "User not found!",
        };
      }
    } catch (err) {
      if (err.errors) {
        res.status(500).json({
          status: 500,
          ...err,
        });
      } else {
        res.status(err.status).json(err);
      }
    }
  }

  static async updateProfile(req, res) {
    const userData = req.userData;
    const file = req.file;
    const { name, birthdate, gender } = req.body;

    try {
      const user = await User.findOne({ where: { email: userData.email } });

      await User.update(
        {
          name,
          birthdate,
          gender,
          avatar: file ? file.filename : user.avatar,
        },
        { where: { email: user.email } }
      );

      const newUserData = await User.findOne({
        where: { email: userData.email },
      });

      res.status(200).json({
        status: 200,
        message: "User data has been updated!",
        user: newUserData,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async homePage(req, res) {
    try {
      const limit = 3;

      const totalProduct = await Product.findAll();
      const totalPage = Math.ceil(totalProduct.length / limit);
      const products = await Product.findAll({
        order: [["id", "ASC"]],
        limit: limit,
        attributes: { exclude: ["UserId"] },
        include: [
          { model: User, attributes: ["name"] },
          {
            model: Products_image,
            attributes: ["fileName", "primary"],
          },
        ],
      });
      res.status(200).json({
        totalProduct: totalProduct.length,
        limit,
        totalPage,
        products,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async productsPage(req, res) {
    let page = +req.params.page;
    if (!page) page = 1;
    const limit = 10;

    const offset = (page - 1) * limit;

    try {
      const products = await Product.findAll({
        order: [["id", "ASC"]],
        offset,
        limit,
        attributes: { exclude: ["UserId"] },
        include: [
          { model: User, attributes: ["name"] },
          {
            model: Products_image,
            attributes: ["fileName", "primary"],
          },
        ],
      });
      res.status(200).json({
        products,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async productDetailsPage(req, res) {
    try {
      const id = +req.params.id;

      const product = await Product.findByPk(id, {
        attributes: { exclude: ["UserId"] },
        include: [
          { model: User, attributes: ["name"] },
          {
            model: Products_image,
            attributes: ["fileName", "primary"],
          },
        ],
      });

      await product.update({ views: product.views + 1 }, { where: { id } });

      res.status(200).json({
        product,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async addToCart(req, res) {
    try {
      const userId = req.userData.id;
      const userName = req.userData.name;
      const productId = +req.params.id;
      const { qty } = req.body;
      const subName = userName.substring(0, 3).toUpperCase();

      const product = await Product.findByPk(productId);

      const shoppingCart = await Shopping_cart.findAll({
        where: { UserId: userId },
        include: [
          {
            model: Line_item,
            include: [
              {
                model: Product,
              },
            ],
            order: [[Product, "id", "ASC"]],
          },
        ],
        order: [["id", "ASC"]],
      });

      if (shoppingCart.length > 0) {
        const carts = shoppingCart;

        let scID = 0; // seller ditemukan
        let productFound = false; //produk sama ditemukan

        carts.forEach(async (cart) => {
          let foundSeller = false;

          cart.Line_items.forEach(async (line_item) => {
            if (line_item.Product.UserId === product.UserId) {
              foundSeller = true;
              scID = cart.id;
            }

            // update keranjang apabila ada produk yg sama
            if (line_item.ProductId === productId) {
              productFound = true;
              await Line_item.update(
                { qty: line_item.qty + qty },
                { where: { id: line_item.id } }
              );
              return false;
            }
          });
        });

        if (scID > 0 && productFound === false) {
          await Line_item.create({
            ShoppingCartId: scID,
            ProductId: productId,
            qty,
          });
        }

        if (scID === 0 && productFound === false) {
          const shop = await Shopping_cart.create({
            UserId: userId,
          });

          await Line_item.create({
            ShoppingCartId: shop.id,
            ProductId: productId,
            qty,
          });
        }
      } else {
        const shop = await Shopping_cart.create({
          UserId: userId,
        });

        await Line_item.create({
          ShoppingCartId: shop.id,
          ProductId: productId,
          qty,
        });
      }

      const cart = await Shopping_cart.findAll({
        where: { UserId: userId },
        include: [
          {
            model: Line_item,
            include: [
              {
                model: Product,
              },
            ],
            order: [[Product, "id", "ASC"]],
          },
        ],
        order: [["id", "ASC"]],
      });

      res.status(201).json({
        status: 201,
        message: "Your product has been successfully added to cart!",
        cart,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async showCart(req, res) {
    const id = req.userData.id;

    const cart = await Shopping_cart.findOne({
      where: { status: "open" },
    });

    res.json({ id, cart });
  }
}

module.exports = ApiController;
