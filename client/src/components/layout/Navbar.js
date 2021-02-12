import React,{Fragment,useContext,useEffect} from "react";
import {Link} from "react-router-dom";
import propTypes from "prop-types";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import AuthContext from "../../context/auth/authContext";
import NoteContext from "../../context/note/noteContext";
 
const Navbar = ({ title, icon }) => {
   const authContext = useContext(AuthContext);
   const noteContext = useContext(NoteContext);
   const { isAuthenticated, logout, user, loadUser } = authContext;
   const { clearNotes } = noteContext;

   useEffect(() => {
     loadUser();
    //  eslint-disable-next-line
   }, []);

   const onLogout = () => {
     logout();
     clearNotes();
   };

   const authLinks = (
     <Fragment>
       <li>Hello {user && user.user.name}</li>
       <li>
         <a onClick={onLogout} href="#!">
           <i className="fas fa-sign-out-alt" />
           <span className="hide-sm">Logout</span>
         </a>
       </li>
     </Fragment>
   );

   const guestLinks = (
     <Fragment>
       <li>
         <Link to="/register">Register</Link>
       </li>
       <li>
         <Link to="/login">Login</Link>
       </li>
     </Fragment>
   );

  return (
    <div className="navbar bg-danger">
      <h1>
        <MenuBookIcon />
        {title}
      </h1>
      <ul>
    {isAuthenticated?authLinks:guestLinks}
      </ul>
    </div>
  );
};
Navbar.propTypes = {
  title: propTypes.string.isRequired,
};
Navbar.defaultProps = {
  title: "NotesApp",
};
export default Navbar;
