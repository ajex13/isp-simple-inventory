"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.Warehouse, {
        through: "ProductWarehouse",
      });
    }
  }
  Product.init(
    {
      sku_code: DataTypes.STRING,
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
