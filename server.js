const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const productRoutes = require("./routes/ProductRoutes");
const WarehouseRoutes = require("./routes/WarehouseRoutes");

app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4000;

// routes go here

app.use("/products", productRoutes);
app.use("/warehouses", WarehouseRoutes);

const server = app.listen(port, function () {
  console.log("Listening on port : " + port);
});

module.exports = server;
