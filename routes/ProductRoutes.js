const express = require("express");
const ProductRoute = express.Router();
const { Product, Warehouse, ProductWarehouse } = require("../models");

ProductRoute.route("/").get(async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Warehouse,
          attributes: ["name"],
          through: {
            model: ProductWarehouse,
            attributes: ["item_count", "low_item_threshold"],
          },
        },
      ],
    });

    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).send("There was an issue while fetching");
  }
});

ProductRoute.route("/:id").get(async (req, res) => {
  try {
    const product = await Product.findOne({
      where : {
        id : req.params.id
      },
      include: [
        {
          model: Warehouse,
          attributes: ["id","name"],
          through: {
            model: ProductWarehouse,
            attributes: ["item_count", "low_item_threshold"],
          },
        },
      ],
    });

    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).send("There was an issue while fetching");
  }
});

module.exports = ProductRoute;
