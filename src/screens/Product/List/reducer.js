import { ALL_PRODUCTS_FETCHED } from "./constants";

const defaultState = {
    products: [],
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case ALL_PRODUCTS_FETCHED:
            if (action.data) {
                return Object.assign({}, state, {
                    products: action.data.products
                });
            }
            return state;
        default:
            return state;
    }
}
