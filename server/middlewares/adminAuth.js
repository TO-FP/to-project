const { User } = require("../models");

const adminAuth = (req, res, next) => {
  //tambahkan pengecekan token

  // if(token) {
  //     ...
  // } else {
  //     ...
  // }

  const id = +req.body.id;
  User.findByPk(id)
    .then((user) => {
      if (user) {
        if (user.type === "admin") {
          next();
        } else {
          throw {
            status: 401,
            message: "Unauthorized!",
          };
        }
      } else {
        throw {
          status: 404,
          message: "User not found!",
        };
      }
    })
    .catch((err) => {
      res.status(err.status || 500).json(err);
    });
};

module.exports = adminAuth;
