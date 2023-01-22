import { combineReducers, createStore,applyMiddleware } from "redux";
import { Pins } from "./pincodes";
import thunk from "redux-thunk";
import logger from 'redux-logger';
import { Product } from "./products";
import { Carts } from "./cart";

import { Auth } from './auth';
import { Orders } from "./order";
import { Address } from "./address";
import { Progress } from "./progress";
import { OrderSuccess } from "./ordersuccess";
import {Modal} from './modal'; 
export const configureStore=()=>{
    const store= createStore(
        combineReducers({
            pins:Pins,
            products:Product,
            carts:Carts,
            auth:Auth,
            orders:Orders,
            address:Address,
            progress:Progress,
            ordersuccess:OrderSuccess,
            modal:Modal
        }),
        applyMiddleware(thunk,logger)
    );
    return store;

}