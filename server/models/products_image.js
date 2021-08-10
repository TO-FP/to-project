'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      products_image.belongsTo(models.Product)
    }
  };
  products_image.init({
    ProductId: DataTypes.INTEGER,
    fileName: DataTypes.STRING,
    fileSize: DataTypes.STRING,
    fileType: DataTypes.STRING,
    primary: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'products_image',
  });
  return products_image;
};