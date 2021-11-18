import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        loding: true,
        product: [],
      };

    case ALL_PRODUCT_SUCCESS:
      return {
        loding: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
      };

    case ALL_PRODUCT_FAIL:
      return {
        loding: false,
        err: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
