import { ALL_PRODUCTS_FETCHED } from "./constants";

const defaultState = {
    products: [],
    warehouses: [],
    count: 0,
    currentPage:1,
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case ALL_PRODUCTS_FETCHED:
            if (action.data) {
                return Object.assign({}, state, {
                    products: action.data.products,
                    warehouses: action.data.warehouses,
                    count: action.data.count,
                    currentPage: action.data.currentPage,
                });
            }
            return state;
        default:
            return state;
    }
}
