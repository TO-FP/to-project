"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "admin",
          email: "admin@gmail.com",
          password: "admin123",
          birthdate: new Date(),
          gender: "male",
          avatar: "https://via.placeholder.com/350",
          type: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "dimas",
          email: "dimas@gmail.com",
          password: "dimas123",
          birthdate: new Date(),
          gender: "male",
          avatar: "https://via.placeholder.com/350",
          type: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
