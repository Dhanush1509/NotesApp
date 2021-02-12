
// import React,{useReducer} from 'react';
// import AlertContext from './alertContext';
// import { v4 as uuidv4 } from "uuid";
// import alertReducer from './alertReducer';
// import {CLEAR_ALERT,SET_ALERT} from '../types.js';
// const AlertState = (props)=>{
//     const initialState=[];
//     const [state,dispatch]=useReducer(alertReducer,initialState);
//     const setAlert=(msg,type,timeout=500)=>{
// const id=uuidv4();

// dispatch({type:SET_ALERT,payload:{msg,type,id}})
//         setTimeout(dispatch({type:CLEAR_ALERT,payload:id}),timeout);
//     }

//     return(<AlertContext.Provider value={{setAlert,alerts:state}}>{props.children}</AlertContext.Provider>);
// }
// export default AlertState;
import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { SET_ALERT, CLEAR_ALERT } from "../types";

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });

    setTimeout(() => dispatch({ type: CLEAR_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
