const { User, Product } = require("../models");

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

  static showAllProduct(req,res){

    Product.findAll()
      .then(product => {
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

  static async addProduct(req,res){

    try{

      const { UserId, name, desc, price, stock, weight, category, brand, condition } = req.body


      let newProduct = await Product.create({

        UserId, name, desc, price, stock, weight, category, brand, condition

      })
      res.status(200).json(newProduct)
    }
    catch(err){
      res.json(err)
    }

  }

  static async findById(req,res){

    const id = +req.params.id
    try{
        let productById = Product.findByApk(id)
        res.status(200).json(productById)
    }
    catch(err){
      res.json(err)
    }

  }





}

module.exports = AdminController;
