"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Warehouse extends Model {
    static associate(models) {
      Warehouse.belongsToMany(models.Product, {
        through: "ProductWarehouse",
        as: "products",
      });
    }
  }
  Warehouse.init(
    {
      wh_code: DataTypes.STRING,
      name: DataTypes.STRING,
      pincode: DataTypes.STRING,
      max_capacity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Warehouse",
    }
  );
  return Warehouse;
};
