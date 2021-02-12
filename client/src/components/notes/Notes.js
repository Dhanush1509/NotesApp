import React, { Fragment,useContext,useEffect } from "react";
import NoteItem from "./NoteItem";
import NoteContext from "../../context/note/noteContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Spinner from "../layout/Spinner";
const Notes = () => {
  const noteContext = useContext(NoteContext);
  const { notes, filter,getNotes,loading } = noteContext;
   useEffect(() => {
     getNotes();
     //eslint-disable-next-line
   }, []);
   if (notes !== null && notes.length === 0) {
     return <h4>Please add a Note</h4>;
   }

  
  return (
    <Fragment>
     {typeof notes!=='undefined'&&notes !== null && !loading ?( <TransitionGroup>
        {filter
          ? filter.map((note) => (
              <CSSTransition timeout={500} classNames="item" key={note._id}>
                <NoteItem note={note} />
              </CSSTransition>
            ))
          : notes.map((note) => (
              <CSSTransition key={note._id} timeout={500} classNames="item">
                <NoteItem note={note} />
              </CSSTransition>
            ))}
      </TransitionGroup>):<Spinner/>}
    </Fragment>
  );
};
export default Notes;
