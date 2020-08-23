const axios = require("axios");

export const createWarehouse = (request) => {
  return axios
    .post("/warehouses", request)
    .then(() => {
      alert("Created Successfully!");
    })
    .catch(() => {
        alert("Something went wrong!")
    });
};
