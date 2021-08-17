"use strict";
const { Model } = require("sequelize");
const { encrypter } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Product);
      User.hasMany(models.Order);
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name cannot be null!",
          },
          notEmpty: {
            msg: "Name cannot be empty!",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email cannot be null!",
          },
          notEmpty: {
            msg: "Email cannot be empty!",
          },
          isEmail: {
            msg: "Only email format is allowed!",
          },
          isUnique: (val, next) => {
            User.findOne({ where: { email: val } }).then((user) => {
              if (!user) {
                next();
              } else {
                return next("Email address already in use!");
              }
            });
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password cannot be null!",
          },
          notEmpty: {
            msg: "Password cannot be empty!",
          },
        },
      },
      salt: DataTypes.STRING,
      birthdate: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: {
            msg: "Birthdate cannot be empty!",
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Gender cannot be empty!",
          },
        },
      },
      avatar: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Avatar cannot be empty!",
          },
        },
      },
      type: {
        type: DataTypes.STRING,
      },
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          user.password = encrypter(user.password, user.salt);

          if (user.type === "admin") {
            user.type = "admin";
          } else {
            user.type = "user";
          }
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
