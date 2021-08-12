const { User, Product } = require("../../models");
const { tokenVerifier } = require("../../helpers/jwt");

const authentication = (req, res, next) => {
  const { access_token } = req.headers;

  try {
    if (access_token) {
      const decoded = tokenVerifier(access_token);
      if (decoded.type === "admin") {
        req.userData = decoded;
        next();
      } else {
        throw {
          status: 401,
          message: "You are not authorized!",
        };
      }
    } else {
      throw {
        status: 404,
        message: "Token not found!",
      };
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      ...err,
    });
  }
};

const productAuth = async (req, res, next) => {
  const id = +req.params.id;

  try {
    const product = await Product.findByPk(id);
    if (product) {
      if (product.UserId === req.userData.id) {
        next();
      } else {
        throw {
          status: 401,
          message: "User is not allowed to update or delete this product",
        };
      }
    } else {
      throw {
        status: 404,
        message: "Product not found!",
      };
    }
  } catch (err) {
    res.status(err.status || 500).json(err);
  }
};

module.exports = { authentication, productAuth };
