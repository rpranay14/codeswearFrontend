import * as ActionTypes from './ActionTypes';

export const Auth = (state = {
    isLoading:false,
    isAuthenticated: false,
    token: null,
    errormsg:null,
    creds:null,
    userRoles:null
    

}, action) => {

    switch (action.type) {
        case ActionTypes.LOGIN_REQ:
            return {...state,
                isLoading:true,
                isAuthenticated:false

            };
        case ActionTypes.LOGIN:
            return {
                ...state,
                isLoading:false,
                isAuthenticated: true,
                token: action.payload.accessToken,
                userRoles: action.payload.userRoles,
                creds:action.payload,
                errormsg:null,
              

            };
       
        case ActionTypes.LOGIN_ERROR:
            return {
                ...state,
                isLoading:false,
                isAuthenticated: false,
                creds:[],
                token:null,
                userRoles:null,
                errormsg: action.payload

            }

        case ActionTypes.LOGOUT:
            return {
                ...state,
                isLoading:false,
                isAuthenticated: false,
                token: null,
                userRoles:null,
               creds:[],
               errormsg:null
            };
            case ActionTypes.REFRESH_ACCESS_TOKEN:
            return {
                ...state,
                isAuthenticated: true,
                creds:action.payload,
                token: action.payload.accessToken,
                userRoles: action.payload.userRoles
                
            };
            case ActionTypes.REFRESH_TOKEN_EXPIRED:
                return {
                    ...state,
                    token: null,
                };
        case ActionTypes.SIGNUP:
            return {
                state

            };
        default:
            return state;
    }
}