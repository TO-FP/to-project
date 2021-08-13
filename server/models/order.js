'use strict';
const {
  Model
} = require('sequelize');
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
  };
  Order.init({
    UserId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    subtotal: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    tax: DataTypes.INTEGER,
    totalDue: DataTypes.INTEGER,
    totalQty: DataTypes.INTEGER,
    payTrx: DataTypes.INTEGER,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};