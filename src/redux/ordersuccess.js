import * as ActionTypes from './ActionTypes';
 export const OrderSuccess=(state={orderPlaced:false},action)=>{
    switch (action.type) {
        case ActionTypes.ORDER_SUCCESS:
            return {...state,orderPlaced:true};
            case ActionTypes.ORDER_FAILED:
                return {...state,orderPlaced:false}; 
        default:
          return state;
    }
};