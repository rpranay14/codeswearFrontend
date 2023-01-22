import * as ActionTypes from './ActionTypes';
 export const Pins=(state={pincodes:[]},action)=>{
    switch (action.type) {
        case ActionTypes.FETCH_PINCODES:
            return {...state,pincodes:action.payload};
        default:
          return state;
    }
};