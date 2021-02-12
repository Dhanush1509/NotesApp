import React, {
  useReducer
} from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  CLEAR_ERRORS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "../types";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
const AuthState = (props) => {
  const initialState = {
    loading: true,
    isAuthenticated: false,
    user: null,
    error: null,
    token: localStorage.getItem("token"),
  };

  const [state, dispatch] = useReducer(authReducer, initialState);


  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
    };
    try {
      const res = await axios.post("/users", formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.message
      });
    }
  };
    const login = async (formData) => {
       const config = {
         headers: {
           "Content-Type": "application/json",
         },
       };
      try {
        const res = await axios.post("/auth", formData, config);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
          
        });
        loadUser();
      } catch (err) {
        dispatch({
          type: LOGIN_FAIL,
          payload: err.response.data.message,
        });
      }
    };

    const loadUser = async () => {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      try {
        const res = await axios.get("/auth");
        dispatch({
          type: USER_LOADED,
          payload: res.data,
        });
      } catch (err) {
        dispatch({
          type: AUTH_ERROR,
        });
      }
    };
  const clearErrors = () => dispatch({
    type: CLEAR_ERRORS
  });
  const logout=()=>{
    dispatch({type: LOGOUT});
  }
  return ( <AuthContext.Provider value = {{
        loading: state.loading,
        token: state.token,
        error: state.error,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        register,
        loadUser,
        clearErrors,login,logout
      }}>
    {
      props.children
    } {
      " "
    } </AuthContext.Provider>
  );
};

export default AuthState;