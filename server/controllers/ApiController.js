const { User, Product, Products_image, Shopping_cart } = require("../models");
const bcrypt = require("bcrypt");
const { decrypter } = require("../helpers/bcrypt");
const { tokenGenerator, tokenVerifier } = require("../helpers/jwt");
const shopping_cart = require("../models/shopping_cart");

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

      res.status(200).json({
        status: 200,
        message: "User data has been updated!",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async homePage(req, res) {
    try {
      const products = await Product.findAll({
        order: [["id", "ASC"]],
        limit: 3,
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
          {
            model: User,
            attributes: ["name"],
            where: {
              type: "admin",
            },
          },
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
      res.status(200).json({
        product,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async AddToCart(req, res) {
    try {
      const { UserId } = req.body;

      let shopping_cart = await Shopping_cart.create({
        UserId,
      });

      // const product = await Product.findByPk(id, )
      // let userId =
      res.status(200).json(shopping_cart);
      // let add = await shopping_cart.create();
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async UserAddProduct(req, res) {
    try {
      const { name, desc, price, category, brand, condition, UserId } =
        req.body;
      const { stock, weight } = +req.body;
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = ApiController;
