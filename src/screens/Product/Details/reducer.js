import { FETCHED_PRODUCT_DETAILS } from "./constants";

const defaultState = {
  productDetails: null,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case FETCHED_PRODUCT_DETAILS:
      return Object.assign({}, state, {
        productDetails : action.data,
      });
    default:
      return state;
  }
}
