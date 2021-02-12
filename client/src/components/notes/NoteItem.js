import React, { useContext } from "react";
import "../../App.css";
import NoteContext from "../../context/note/noteContext";
import PropTypes from "prop-types";
const NoteItem = ({ note }) => {
  const noteContext = useContext(NoteContext);
  const {deleteNote,setCurrent,clearCurrent}=noteContext;
  const { _id, title, description } = note;
  function onDelete(){
    deleteNote(_id);
    clearCurrent();
  }

 
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">{title}</h3>
      <li> {description}</li>
      <ul className="list"></ul>
      <p>
        <button className="btn btn-dark btn-sm" onClick={()=>setCurrent(note)}>Edit</button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};
// NoteItem.propTypes = {
//   Note: PropTypes.object.isRequired,
// };
export default NoteItem;
