import {combineReducers} from "redux";

import productReducer from './screens/Product/List/reducer';
import productDetailsReducer from './screens/Product/Details/reducer';
import createWarehouseReducer from './screens/Warehouse/Create/reducer';


const rootReducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    createWarehouse: createWarehouseReducer,
});

export default rootReducer;
