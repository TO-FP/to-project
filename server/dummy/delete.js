const { User, Product, Products_image } = require("../models");

const deleteAll = async () => {
  await User.destroy({ where: {} }).then(() => {
    console.log("all user has been deleted successfully");
  });

  await Product.destroy({ where: {} }).then(() => {
    console.log("all product has been deleted successfully");
  });

  await Products_image.destroy({ where: {} }).then(() => {
    console.log("all product images has been deleted successfully");
  });

  process.exit();
};

deleteAll();
