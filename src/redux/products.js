import * as ActionTypes from './ActionTypes';

export const Product=(state={products:[],singleproduct:[]},action)=>{
    switch (action.type){
        case ActionTypes.ADD_PRODUCTS:
            return{...state,products:action.payload};
            case ActionTypes.FETCH_PRODUCT_BY_ID:
            return{...state,singleproduct:action.payload};
            default:
                return state;
    }

}