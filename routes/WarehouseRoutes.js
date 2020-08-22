const express = require("express");
const WarehouseRoute = express.Router();
const { Product, Warehouse, ProductWarehouse } = require("../models");
const generateCode = require("../utilities/code-genrator");

// warehouse routes
WarehouseRoute.route("/").post(async (req, res) => {
  const warehouseDetails = req.body;
  warehouseDetails.wh_code = generateCode(warehouseDetails.name, 4);
  try {
    const warehouse = await Warehouse.create(warehouseDetails);

    const products = await Product.findAll({ raw: true });

    const pws = [];
    products.forEach((product) => {
      const pw = {
        productId: product.id,
        warehouseId: warehouse.id,
        item_count: 0,
        low_item_threshold: 10,
      };
      pws.push(pw);
    });

    await ProductWarehouse.bulkCreate(pws);
    res.status(201).send(warehouse);
  } catch (err) {
    console.log(err);
    res.status(500).send("There was an issue while updating");
  }
});

module.exports = WarehouseRoute;
