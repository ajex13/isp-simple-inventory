const express = require("express");
const ProductRoute = express.Router();
const { Product, Warehouse, ProductWarehouse } = require("../models");

ProductRoute.route("/").get(async function (req, res)  {
  try {
    const allProducts = await Product.findAll({
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

    res.status(200).json(allProducts);
  } catch (err) {
      console.log(err);
    res.status(500).send("There was an issue while fetching");
  }
});

module.exports = ProductRoute;
