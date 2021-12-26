import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./reducers/productReducer";
import {forgetPasswordReducer, profilerReducer, userReducer} from "./reducers/userReducer"
const reducer = combineReducers({
products:productReducer,productDetails:productDetailsReducer,
user:userReducer,
profile:profilerReducer,
forgetPassword:forgetPasswordReducer,
});

let initialState = {};

const middleWare = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;