const express = require("express");
const ProductRoute = express.Router();
const { Product, Warehouse, ProductWarehouse } = require("../models");

ProductRoute.route("/").get(async (req, res) => {
  const pageSizeNumber = Number(req.query.pageSize);
  const skipEntities = Number(req.query.pageNumber - 1) * pageSizeNumber;
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
      offset: skipEntities,
      limit: pageSizeNumber,
    });
    const count = await Product.count();
    const warehouses = await Warehouse.findAll({
      attributes: ["name"],
    });
    const data = {
      products,
      count,
      warehouses: warehouses.map((w) => w.name),
    };
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("There was an issue while fetching");
  }
});

ProductRoute.route("/:id").get(async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Warehouse,
          attributes: ["id", "name"],
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

ProductRoute.route("/:id").patch(async (req, res) => {
  const warehouses = req.body.data;
  try {
    for (const warehouse of warehouses) {
      await ProductWarehouse.update(
        {
          item_count: warehouse.item_count,
          low_item_threshold: warehouse.low_item_threshold,
        },
        {
          where: {
            productId: req.params.id,
            warehouseId: warehouse.warehouseId,
          },
        }
      );
    }
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(500).send("There was an issue while updating");
  }
});

module.exports = ProductRoute;
