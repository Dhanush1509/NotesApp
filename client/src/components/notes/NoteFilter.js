import React, { useContext, useRef,useEffect } from "react";
import NoteContext from "../../context/note/noteContext";

const NoteFilter = () => {
  const noteContext = useContext(NoteContext);
  const { filterNotes, clearFilter,filter } = noteContext;

  const text = useRef("");
  const onChange = (e) => {
    if (text.current.value !== "") {
      filterNotes(e.target.value);
    } else {
      clearFilter();
    }
  };
useEffect(()=>{
    if(filter===null){
        text.current.value='';
    }
});
  return (
    <div>
      <input
        ref={text}
        type="text"
        name="inputText"
        placeholder="Filter Notes..."
        onChange={onChange}
      />
    </div>
  );
};

export default NoteFilter;
