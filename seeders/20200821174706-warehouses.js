"use strict";
const faker = require("faker");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Warehouses",
      [
        {
          wh_code: `BOM-${faker.random.alphaNumeric(4)}`,
          name: "Mumbai",
          pincode: 400001,
          max_capacity: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          wh_code: `DEL-${faker.random.alphaNumeric(4)}`,
          name: "New Delhi",
          pincode: 110001,
          max_capacity: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          wh_code: `BLR-${faker.random.alphaNumeric(4)}`,
          name: "Bengaluru",
          pincode: 560001,
          max_capacity: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Warehouses", null, {});
  },
};
