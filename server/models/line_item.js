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
      Line_item.belongsTo(models.Shopping_cart);
      Line_item.belongsTo(models.Product);
      Line_item.belongsTo(models.Order);
      // define association here
    }
  }
  Line_item.init(
    {
      ShoppingCartId: {
        type: DataTypes.INTEGER,
        // references: {
        //   model: "Shopping_cart",
        //   key: "id",
        // },
      },
      OrderName: {
        type: DataTypes.STRING,
      },
      ProductId: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (line_item, options) => {
          line_item.status = "cart";
        },
      },
      sequelize,
      modelName: "Line_item",
    }
  );
  return Line_item;
};
