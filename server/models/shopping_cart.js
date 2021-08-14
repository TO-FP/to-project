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
      // define association here
      Shopping_cart.belongsTo(models.User);
      Shopping_cart.hasMany(models.Line_item);
    }
  }
  Shopping_cart.init(
    {
      UserId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Shopping_cart",
      hooks: {
        beforeCreate(cart, options) {
          cart.status = "open";
        },
      },
    }
  );
  return Shopping_cart;
};
