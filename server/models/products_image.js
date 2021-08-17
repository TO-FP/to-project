"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products_image.belongsTo(models.Product);
    }
  }
  Products_image.init(
    {
      ProductId: DataTypes.INTEGER,
      fileName: DataTypes.STRING,
      fileSize: DataTypes.STRING,
      fileType: DataTypes.STRING,
      primary: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Products_image",
    }
  );
  return Products_image;
};
