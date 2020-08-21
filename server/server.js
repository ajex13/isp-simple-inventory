const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4000;

// routes go here

const server = app.listen(port, function () {
  console.log("Listening on port : " + port);
});

module.exports = server;
