import axios from "axios";
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
    CLEAR_ERRORS,
  } from "../constants/productConstants";

// get all products
  export const getProduct=(keyword="")=> async (dispatch)=>{
      try{
       
          dispatch({type:ALL_PRODUCT_REQUEST});
          const {data}=await axios.get(`/api/v1/product?keyword=${keyword}`);
          dispatch({
              type:ALL_PRODUCT_SUCCESS,
              payload:data,
          })
      }
      catch(error){
          dispatch({
              type:ALL_PRODUCT_FAIL,
              payload:error?.response?.data?.message
          })
      }
  }

// get details of the product
export const getProductDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
  
      const {data}=await axios.get(`/api/v1/product/${id}`);
  
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  

// clearing Errors
  export const clearErros=()=> async (dispatch)=>{
      dispatch({type:CLEAR_ERRORS});

  }