import {combineReducers} from "redux";

import productReducer from './screens/Product/List/reducer';
import productDetailsReducer from './screens/Product/Details/reducer';


const rootReducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
});

export default rootReducer;
