import * as ActionTypes from './ActionTypes';
 export const Address=(state={address:null},action)=>{
    switch (action.type) {
        case ActionTypes.FETCH_ADDRESS:
            return {...state,address:action.payload};
            case ActionTypes.EDIT_ADDRESS:
                return {...state,address:action.payload};
        default:
          return state;
    }
};
















