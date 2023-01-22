import * as ActionTypes from "./ActionTypes";

export const Orders = (state = { orderid: null, orders: [], singleorder: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_ORDER:
            return { ...state, orderid: action.payload };

        case ActionTypes.FETCH_ORDER:
            return { ...state, orders: action.payload };
        case ActionTypes.FETCH_SINGLE_ORDER:
            return { ...state, singleorder: action.payload };
        default:
            return state;
    }
};