"use strict";
const { Product, Warehouse } = require("../models");
const faker = require("faker");
const { options } = require("../routes/ProductRoutes");

const getPws = (products, warehouses) => {
  const pws = [];
  warehouses.forEach((warehouse) => {
    if (warehouse.name === "Mumbai") {
      products.forEach((product) => {
        const pw = {
          productId: product.id,
          warehouseId: warehouse.id,
          item_count: faker.random.number({
            min: 100,
            max: 300,
          }),
          low_item_threshold: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        pws.push(pw);
      });
    }

    if (warehouse.name === "New Delhi") {
      for (let index = 0; index < products.length; index++) {
        let count = 0;
        if (index <= products.length / 3) {
          count = faker.random.number({
            min: 0,
            max: 99,
          });
        } else {
          count = faker.random.number({
            min: 100,
            max: 300,
          });
        }
        const pw = {
          productId: products[index].id,
          warehouseId: warehouse.id,
          item_count: count,
          low_item_threshold: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        pws.push(pw);
      }
    }

    if (warehouse.name === "Bengaluru") {
      for (let index = 0; index < products.length; index++) {
        let count = 0;
        if (index <= products.length / 2) {
          count = faker.random.number({
            min: 0,
            max: 99,
          });
        } else {
          count = faker.random.number({
            min: 100,
            max: 300,
          });
        }
        const pw = {
          productId: products[index].id,
          warehouseId: warehouse.id,
          item_count: count,
          low_item_threshold: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        pws.push(pw);
      }
    }
  });
  return pws;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = await Product.findAll({ raw: true });
    const warehouses = await Warehouse.findAll({ raw: true });

    const pws = getPws(products, warehouses);
    await queryInterface.bulkInsert("ProductWarehouses", pws, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("ProductWarehouses", null, {});
  },
};
