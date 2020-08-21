"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductWarehouse extends Model {
    static associate(models) {}
  }
  ProductWarehouse.init(
    {
      productId: DataTypes.INTEGER,
      warehouseId: DataTypes.INTEGER,
      item_count: DataTypes.INTEGER,
      low_item_threshold: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductWarehouse",
    }
  );
  return ProductWarehouse;
};
