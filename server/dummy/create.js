const { User, Product, Products_image, Shopping_cart } = require("../models");
const bcrypt = require("bcrypt");
const fs = require("fs");

const createUsers = () => {
  const data = fs.readFileSync("./dummy/JSON/user.json");
  const users = JSON.parse(data);

  try {
    users.forEach(async (user) => {
      const { id, name, email, password, gender, birthdate, avatar, type } =
        user;
      const salt = bcrypt.genSaltSync(10);
      await User.create({
        id,
        name,
        email,
        password,
        salt,
        gender,
        birthdate,
        avatar,
        type,
      });
      console.log("dummy data for user has been created successfully!");
    });
  } catch (err) {
    console.log("something went wrong! can't create dummy data for user.");
  }
};

const createProducts = () => {
  const data = fs.readFileSync("./dummy/JSON/product.json");
  const products = JSON.parse(data);

  let status = true;

  products.forEach(async (product) => {
    const { UserId, name, desc, weight, category, brand, condition, images } =
      product;

    const stock = Math.floor(Math.random() * 56) + 1;
    const price = Math.floor(Math.random() * 4999999) + 500000;
    const rating = Math.floor(Math.random() * 5) + 1;
    const views = Math.floor(Math.random() * 300) + 1;

    try {
      const productAdded = await Product.create({
        UserId,
        name,
        desc,
        price,
        stock,
        weight,
        category,
        brand,
        condition,
        rating,
        views,
      });

      images.forEach(async (img) => {
        try {
          await Products_image.create({
            ProductId: productAdded.id,
            fileName: img.fileName,
            fileSize: img.fileSize,
            fileType: img.fileType,
            primary: img.primary,
          });
        } catch (err) {
          status = false;
        }
      });
    } catch (err) {
      status = false;
    }
  });

  if (status) {
    console.log("dummy data for products has been created!");
  } else {
    console.log(
      "something went wrong! can't create dummy data for product & product_images."
    );
  }
};

createUsers();
createProducts();
