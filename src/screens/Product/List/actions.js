import { ALL_PRODUCTS_FETCHED } from "./constants";

const axios = require("axios");

export const fetchAllProducts = (pageNumber=1, pageSize=20) => {
  return (dispatch) => {
    let url = `/products?pageNumber=${pageNumber}&pageSize=${pageSize}`;

    return axios
      .get(url)
      .then(({data}) => {
        dispatch({
          type: ALL_PRODUCTS_FETCHED,
          data: {
            products: data.products,
            warehouses: data.warehouses,
          },
        });
      })
      .catch(() => {
        dispatch({
          type: ALL_PRODUCTS_FETCHED,
          data: [],
        });
      });
  };
};
