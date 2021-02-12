
import React,{Fragment} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import NoteState from './context/note/NoteState';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register"
import "./App.css";
import Alert from "./components/layout/Alert";
import AlertState from "./context/alert/AlertState";
import AuthState from "./context/auth/AuthState";
import PrivateRoute from "./components/routing/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";
if(localStorage.token){
  setAuthToken(localStorage.token); 
}
function App() {
  return (
    <AuthState>
      <NoteState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alert />
                <Switch>
                  <PrivateRoute exact path="/" component={Home}/>
                  <Route exact path="/About" component={About}/>
                  <Route exact path="/register" component={Register}/>
                  <Route exact path="/login" component={Login}/>
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </NoteState>
    </AuthState>
  );
}

export default App;
