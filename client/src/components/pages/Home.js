import React,{Fragment,useContext} from "react";
import Notes from "../notes/Notes"
import NoteForm from "../notes/NoteForm"
import NoteFilter from "../notes/NoteFilter";
import authContext from "../../context/auth/authContext"
import { SpinnerCircularFixed } from "spinners-react";
const Home = () => {
  const AuthContext = useContext(authContext);
  const {isAuthenticated,loading}=AuthContext;
  return (
    <Fragment>
      {loading ? (
        <div style={{ textAlign: "center",marginTop:"30vh" }}>
          <SpinnerCircularFixed
            size={90}
            thickness={180}
            speed={96}
            color="#dc3454"
            secondaryColor="rgba(1, 1, 1, 0.9)"
          />
        </div>
      ) : isAuthenticated ? (
        <div className="grid-2">
          <div>
            <NoteForm />
          </div>
          <div>
            <NoteFilter />
            <Notes />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};
export default Home;
