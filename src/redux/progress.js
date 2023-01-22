import * as ActionTypes from './ActionTypes';
 export const Progress=(state={progress:30},action)=>{
    switch (action.type) {
        case ActionTypes.TOP_LOADING_CHANGE:
            return {...state,progress:action.payload};
        default:
          return state;
    }
};