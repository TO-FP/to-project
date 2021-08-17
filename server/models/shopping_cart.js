"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shopping_cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Shopping_cart.hasMany(models.Line_item);
      // define association here
    }
  }
  Shopping_cart.init(
    {
      UserId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (cart, options) => {
          cart.status = "open";
        },
      },
      sequelize,
      modelName: "Shopping_cart",
    }
  );
  return Shopping_cart;
};
