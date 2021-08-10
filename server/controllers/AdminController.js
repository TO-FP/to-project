const { User, Product, products_image } = require("../models");

class AdminController {
  static dashboard(req, res) {
    res.status(200).json({
      status: 200,
      message: "Admin validated.",
    });
  }

  static getUsers(req, res) {
    User.findAll()
      .then((users) => {
        res.status(200).json({
          status: 200,
          message: "Users displayed successfully!",
          users,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static showAllProduct(req, res) {
    Product.findAll()
      .then((product) => {
        res.status(200).json({
          status: 200,
          message: "Users displayed successfully!",
          product,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static async addProduct(req, res) {
    try {
      const {
        UserId,
        name,
        desc,
        price,
        stock,
        weight,
        category,
        brand,
        condition,
        fileName,
        fileSize,
        fileType,
        primary,
      } = req.body;

      let newProduct = await Product.create({
        UserId,
        name,
        desc,
        price,
        stock,
        weight,
        category,
        brand,
        condition,
      });

      let imageArray = [
        {
          fileName: "image1",
          fileSize: "150kb",
          fileType: "jpg",
          primary: true,
        },
        {
          fileName: "image2",
          fileSize: "150kb",
          fileType: "jpg",
          primary: false,
        },
        {
          fileName: "image3",
          fileSize: "150kb",
          fileType: "jpg",
          primary: false,
        },
        {
          fileName: "image4",
          fileSize: "150kb",
          fileType: "jpg",
          primary: false,
        },
      ];

      imageArray.forEach((img) => {
        products_image.create({
          ProductId: newProduct.id,
          fileName: img.fileName,
          fileSize: img.fileSize,
          fileType: img.fileType,
          primary: img.primary,
        });
      });

      // let newImage = await products_image.create({
      //   ProductId: newProduct.id , fileName, fileSize, fileType, primary
      // })

      res.status(200).json({ message: "image berhasil ditambahkan" });
    } catch (err) {
      res.json(err);
    }
  }

  static async findById(req, res) {
    const id = +req.params.id;
    try {
      let productById = Product.findByPk(id);

      res
        .status(200)
        .json({ message: "produk detail berhasil ditampilkan", productById });
    } catch (err) {
      res.json(err);
    }
  }

  static async updateProduct(req, res) {
    try {
      const id = +req.params.id;

      const { name, desc, price, stock, weight, category, brand, condition } =
        req.body;

      let updatingProduct = await Product.update(
        {
          name,
          desc,
          price,
          stock,
          weight,
          category,
          brand,
          condition,
        },
        {
          where: {
            id: id,
          },
        }
      );

      res.status(200).json(updatingProduct);
    } catch (err) {
      res.json(err);
    }
  }

  static async deleteProduct(req, res) {
    try {
      const id = +req.params.id;

      let deletingProduct = await Product.destroy({
        where: { id: id },
      });

      res.status(200).json(deletingProduct);
    } catch (err) {
      res.json(err);
    }
  }

  // Product Image

  // static async addProductImages(req,res){
  //   try{
  //     const id = +req.params.id
  //     const { fileName, fileSize, fileType, primary} = req.body

  //     let addImage = products_image.create({
  //       fileName, fileSize, fileType, primary

  //     },
  //     {
  //       where: {id:id}
  //     })
  //     res.status(200).json(addImage)

  //   }
  //   catch(err){
  //     res.status(500).json(err)

  //   }
  // }
}

module.exports = AdminController;
