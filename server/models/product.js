"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User);
      Product.hasMany(models.Products_image);
      Product.hasMany(models.Line_item);
    }
  }
  Product.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name cannot be empty!",
          },
          notNull: true,
        },
      },
      desc: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Desc cannot be empty!",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Price cannot be empty!",
          },
          isInt: true,
          notNull: true,
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Stock cannot be empty!",
          },
          isInt: true,
          notNull: true,
        },
      },

      expire: DataTypes.DATE,

      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Weight cannot be empty!",
          },
          isInt: true,
          notNull: true,
        },
      },
      category: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Category cannot be empty!",
          },
        },
      },
      brand: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Category cannot be empty!",
          },
        },
      },
      condition: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Category cannot be empty!",
          },
        },
      },
      totalSold: {
        type: DataTypes.INTEGER,
      },
      rating: {
        type: DataTypes.INTEGER,
      },
      views: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Product",
      hooks: {
        beforeCreate(product, options) {
          // product.deletedAt = NULL;
//           product.expire = new Date();
//           product.totalSold = 0;
//           product.rating = 0;
//           product.views = 0;
          product.expire = new Date();
          product.totalSold = product.totalSold ? product.totalSold : 0;
          product.rating = product.rating ? product.rating : 0;
          product.views = product.views ? product.views : 0;
        },
      },
      // deletedAt: "deletedAt",
      paranoid: true,
      timestamps: true,
    }
  );
  return Product;
};
