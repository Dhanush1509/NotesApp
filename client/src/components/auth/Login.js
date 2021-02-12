import React, { useState, useContext, useEffect } from "react";
import "../../App.css";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Login = (props) => {
  
const alertContext = useContext(AlertContext);
const authContext = useContext(AuthContext);
const { setAlert } = alertContext;
const { error, clearErrors, isAuthenticated, login } = authContext;
useEffect(() => {
  if (isAuthenticated) {
    props.history.push("/");
  }
  if (error === "invalid credentials") {
    setAlert(error, "danger");
    clearErrors();
  }
  //eslint-disable-next-line
}, [error, isAuthenticated, props.history]);


  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if(email ===''||password ===''){
      setAlert('Fields cannot be empty');
    }
    else{
      login({ email, password})
    }
   
  };
  return (
    <div className="form-container">
      <h2 className="text-primary">Login User</h2>
      <form onSubmit={onSubmit}>
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
export default Login;
