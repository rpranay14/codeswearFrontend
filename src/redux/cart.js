import * as ActionTypes from "./ActionTypes";
import { CARTS } from "../shared/carts";

export const Carts = (state = CARTS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
             const exist=state.find((x)=>x.productid===action.payload.productid && x.size===action.payload.size)
             
             if(exist)
              {
                const newCarts=state.map((x)=>
                (x.productid===action.payload.productid) && (x.size===action.payload.size) ? {...exist,quantity:exist.quantity+1}:x )
                state=newCarts;
                return state;
              }
              else
              {
                const newCartItems=[...state,{...action.payload,quantity:1}]
                state=newCartItems;
                 return state;
              }

           

        case ActionTypes.CLEAR_CART:
            return state = [];

        case ActionTypes.REMOVE_FROM_CART:
          const exists=state.find((x)=>x.productid===action.payload.productid && x.size===action.payload.size);
            if(exists){

              if(exists.quantity==1)
                {
                 
                  const newCart=state.filter((x)=>(x.productid!==exists.productid) && (x.size===exists.size) );
                  state=newCart;
                 
                  return state;
                }
                if(exists.quantity>1)
                {
                  const newCart=state.map((x)=>(x.productid===action.payload.productid) && (x.size===action.payload.size) ? {...exists,quantity:exists.quantity-1}:x )
                  state=newCart;
                  return state;
                }
              }
        default:
          return state;
    } 

}