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
    }
  }
  Product.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          len: [2, 100],
        },
      },
      desc: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          len: [2, 3000],
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
          notNull: true,
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          notNull: true,
        },
      },

      expire: DataTypes.DATE,

      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          notNull: true,
        },
      },
      category: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          len: [2, 50],
        },
      },
      brand: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          len: [1, 50],
        },
      },
      condition: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          len: [2, 15],
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
          product.expire = new Date();
          product.totalSold = 0;
          product.rating = 0;
          product.views = 0;
        },
      },
    }
  );
  return Product;
};
