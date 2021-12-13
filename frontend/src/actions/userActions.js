import axios from "axios";
import { config } from "dotenv";
import {LOGIN_FAIL,LOGIN_SUCCESS,LOGIN_REQUEST,REGISTER_USER_FAIL,REGISTER_USER_REQUEST,REGISTER_USER_SUCCESS, LOAD_USER_FAIL,LOAD_USER_REQUEST,LOAD_USER_SUCCESS, LOGOUT_FAIL,LOGOUT_SUCCESS,  CLEAR_ERRORS} from "../constants/userConstants"



// LOGIN
 export const login=(email,password)=>async(dispatch)=>{
     try {
         dispatch({type:LOGIN_REQUEST});
         const config = { headers: { "Content-Type": "application/json" } };

         const {data}=await axios.post(`/api/v1/login`,{email,password},config);
         dispatch({ type: LOGIN_SUCCESS, payload: data.user });
     } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
     }
 }



//  register
export const register=(userData)=>async(dispatch)=>{
    try {
        dispatch({type:REGISTER_USER_REQUEST});
        const config = { headers: { "Content-Type": "mutipart/form-data" } };

        const {data}=await axios.post(`/api/v1/register`,userData,config);
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
       dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message });
    }
}




// Load user
export const loadUser=()=>async(dispatch)=>{
    try {
        dispatch({type:LOAD_USER_REQUEST});
        const config = { headers: { "Content-Type": "application/json" } };

        const {data}=await axios.get(`/api/v1/me`);
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
       dispatch({ type: LOAD_USER_FAIL, payload: error.response?.data?.message });
    }
}





// Logout user
export const logout=()=>async(dispatch)=>{
    try {
       await axios.get('/api/v1/logout');
        const config = { headers: { "Content-Type": "application/json" } };

        
        dispatch({ type: LOGOUT_SUCCESS});
    } catch (error) {
       dispatch({ type: LOGOUT_FAIL, payload: error.response?.data?.message });
    }
}







//  clear errors
// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };