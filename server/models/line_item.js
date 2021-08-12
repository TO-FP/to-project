"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Line_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Line_item.init(
    {
      ShopId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Shopping_cart",
          key: "id",
        },
      },
      ProductId: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      status: DataTypes.STRING,
      orderName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Line_item",
    }
  );
  return Line_item;
};
