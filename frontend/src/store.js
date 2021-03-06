import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./reducers/productReducer";
import {forgetPasswordReducer, profilerReducer, userReducer} from "./reducers/userReducer"
import { cartReducer } from "./reducers/cartReducer";
const reducer = combineReducers({
products:productReducer,productDetails:productDetailsReducer,
user:userReducer,
profile:profilerReducer,
forgetPassword:forgetPasswordReducer,
cart:cartReducer,
});
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};


const middleWare = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;