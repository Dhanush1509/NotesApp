import React, { useState, useContext,useEffect } from "react";
import "../../App.css";
// import NoteContext from "../../context/note/noteContext";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { error, clearErrors, isAuthenticated, register } = authContext;
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error === "User already exists") {
      setAlert(error, "danger");
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error,isAuthenticated,props.history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = user;
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || email === "" || password === "") {
      setAlert("Fields cannot be empty", "danger");
    } else if (password !== password2) {
      setAlert("Both passwords should match", "danger");
    } else {
      register({ name, email, password });
    }
  };
  return (
    <div className="form-container">
      <h2 className="text-primary">Register User</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        <div className="form-group">
          {" "}
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        <div>
          <input
            type="submit"
            value="Submit"
            className="btn btn-primary btn-block"
          />
        </div>
      </form>
    </div>
  );
};
export default Register;
