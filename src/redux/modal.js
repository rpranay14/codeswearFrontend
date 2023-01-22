import * as ActionTypes from './ActionTypes';
 export const Modal=(state={modalopen:false},action)=>{
    switch (action.type) {
        case ActionTypes.MODAL_TRIGGER:
            return {...state,modal:action.payload};
          
        default:
          return state;
    }
};