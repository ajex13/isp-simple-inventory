"use strict";
const faker = require("faker");

const products = [];

for (let i = 0; i < 60; i++) {
  const product = {
    sku_code: `SKU-${faker.random.alphaNumeric(4)}`,
    name: faker.commerce.product(),
    price: faker.commerce.price(100, 500),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  products.push(product);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Products", products, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
