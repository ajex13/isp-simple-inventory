import {
    FETCHED_PRODUCT_DETAILS,
} from "./constants";

const axios = require('axios');

export const fetchProductDetails = (productId) => {
    return (dispatch) => {
        return axios.get(`/products/${productId}`).then(({data}) => {
            dispatch({
                type: FETCHED_PRODUCT_DETAILS,
                data: data
            });
        }).catch(() => {
            dispatch({
                type: FETCHED_PRODUCT_DETAILS,
                data: null
            });
        });
    };
};

export const updateProduct = (productId, request) => {
    return (dispatch) => {
        return axios.patch(`/products/${productId}`, {data : request}).then(({data}) => {
            dispatch(
                fetchProductDetails(productId)
            );
        }).catch(() => {

        });
    }
};