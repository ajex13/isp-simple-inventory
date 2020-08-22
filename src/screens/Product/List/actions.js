import { ALL_PRODUCTS_FETCHED } from "./constants";

const axios = require("axios");

export const fetchAllProducts = () => {
  return (dispatch) => {
    let url = `/products`;

    return axios
      .get(url)
      .then(({data}) => {
        dispatch({
          type: ALL_PRODUCTS_FETCHED,
          data: {
            products: data,
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
