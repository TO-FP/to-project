"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      UserId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      subtotal: DataTypes.INTEGER,
      discount: DataTypes.INTEGER,
      tax: DataTypes.INTEGER,
      totalDue: DataTypes.INTEGER,
      totalQty: DataTypes.INTEGER,
      payTrx: DataTypes.STRING,
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "City cannot be null!",
          },
          notEmpty: {
            msg: "City cannot be empty!",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Address cannot be null!",
          },
          notEmpty: {
            msg: "Address cannot be empty!",
          },
        },
      },
      status: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (order, options) => {
          order.status = "open";
        },
      },
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
