import React, { useReducer } from "react";
// import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import NoteContext from "./noteContext";
import noteReducer from "./noteReducer";
import {
  GET_NOTES,
  ADD_NOTE,
  DELETE_NOTE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_NOTE,
  FILTER_NOTES,
  CLEAR_NOTES,
  CLEAR_FILTER,
  NOTE_ERROR,
} from "../types";
const NoteState = (props) => {
  const initialState = {
    notes: null,
    current: null,
    filter: null,
    error: null
  };
  const [state, dispatch] = useReducer(noteReducer, initialState);

  //get Notes
  // const getNote=async()=>{}
  //Add notes
   const getNotes = async () => {
     try {
       const res = await axios.get("/notes");

       dispatch({
         type: GET_NOTES,
         payload: res.data,
       });
       
     } catch (err) {
       dispatch({
         type: NOTE_ERROR,
         payload: err.response.data.message,
       });
     }
   };
  const addNote = async (note) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
        const res = await axios.post("/notes", note, config);
        dispatch({
          type: ADD_NOTE,
          payload: res.data,
        });
    } catch (err) {
      dispatch({type: NOTE_ERROR, payload:err.response.data.message});
    }
  };
 const deleteNote = async (id) => {
   try {
     await axios.delete(`/notes/${id}`);

     dispatch({
       type: DELETE_NOTE,
       payload: id,
     });
   } catch (err) {
     dispatch({
       type: NOTE_ERROR,
       payload: err.response.data.message,
     });
   }
 };

 // Update Contact
 const updateNote = async (note) => {
   const config = {
     headers: {
       "Content-Type": "application/json",
     },
   };
   try {
     const res = await axios.put(
       `/notes/${note._id}`,
       note,
       config
     );

     dispatch({
       type: UPDATE_NOTE,
       payload:res.data ,
     });
   } catch (err) {
     dispatch({
       type: NOTE_ERROR,
       payload: err.response.data.message,
     });
   }
 };
  

  const setCurrent = (contact) => {
    dispatch({
      type: SET_CURRENT,
      payload: contact,
    });
  };
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };
 
  const filterNotes = (text) => {
    dispatch({
      type: FILTER_NOTES,
      payload: text,
    });
  };
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER,
    });
  };
   const clearNotes = () => {
     dispatch({ type: CLEAR_NOTES });
   };

  //delete notes.
  //set current notes
  //clear notes
  //update notes
  //filter notes

  //clear filter

  return (
    <NoteContext.Provider
      value={{
        notes: state.notes,
        current: state.current,
        filter: state.filter,
        error: state.error,
        getNotes,
        addNote,
        deleteNote,
        setCurrent,
        clearCurrent,
        updateNote,
        filterNotes,
        clearFilter,
        clearNotes
      }}
    >
      {props.children}{" "}
    </NoteContext.Provider>
  );
};
export default NoteState;
