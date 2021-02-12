import React, { useState, useContext, useEffect } from "react";
import "../../App.css";
import NoteContext from "../../context/note/noteContext";
const NoteForm = () => {
  const noteContext = useContext(NoteContext);
  const { addNote, current, clearCurrent, updateNote } = noteContext;
  const clearAll = () => {
    clearCurrent();
  };
  useEffect(() => {
    if (current) {
      setNote(current);
    } else {
      setNote({ title: "", description: "" });
    }
  }, [current]);

  const [note, setNote] = useState({
    title: "",
    description: "",
  });
  const { title, description } = note;
  const onChange = (e) => setNote({ ...note, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (!current) {
      addNote(note);
    } else {
      updateNote(note);
      clearCurrent();
    }
    setNote({
      title: "",
      description: "",
    });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2 className="text-primary">{current ? "Edit Note" : "Add Note"}</h2>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={onChange}
        />
       {/* <input
          type="text"
          placeholder="Description"
          name="description"
          value={description}
          onChange={onChange}
       />*/}
        <textarea
          type="text"
          placeholder="Description"
          rows="5"
          name="description"
          value={description}
          onChange={onChange}
        />
        <div>
          <input
            type="submit"
            value={current ? "Update Note" : "Add Note"}
            className="btn btn-primary btn-block"
          />
        </div>
        {current && (
          <div>
            <button className="btn btn-light btn-block" onClick={clearAll}>
              clear
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
export default NoteForm;

// import React, { useState, useContext, useEffect } from "react";
// import "../../App.css";
// import NoteContext from "../../context/note/noteContext";
// const NoteForm = () => {
//   const noteContext = useContext(NoteContext);
//   const { addNote, current, deleteNote, clearCurrent } = noteContext;
//   const clearAll = () => {
//     clearCurrent();
//   };
//   useEffect(() => {
//     if (current) {
//       setNote(current);
//       deleteNote(current.id);
//     } else {
//       setNote({ title: " ", description: " " });
//     }
//   }, [current]);

//   const [note, setNote] = useState({
//     title: " ",
//     description: " ",
//   });
//   const { title, description } = note;
//   const onChange = (e) => setNote({ ...note, [e.target.name]: e.target.value });
//   const onSubmit = (e) => {
//     e.preventDefault();
//     addNote(note);
//     clearCurrent();
//     setNote({
//       title: " ",
//       description: " ",
//     });
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <h2 className="text-primary">{current ? "Edit Note" : "Add Note"}</h2>
//         <input
//           type="text"
//           placeholder="title"
//           name="title"
//           value={title}
//           onChange={onChange}
//         />
//         <input
//           type="text"
//           placeholder="description"
//           name="description"
//           value={description}
//           onChange={onChange}
//         />
//         <div>
//           <input
//             type="submit"
//             value={current ? "Update Note" : "Add Note"}
//             className="btn btn-primary btn-block"
//           />
//         </div>
//         {current && (
//           <div>
//             <button className="btn btn-light btn-block" onClick={clearAll}>
//               clear
//             </button>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };
// export default NoteForm;
