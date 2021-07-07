import React from "react";
import "./login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";

const Login = () => {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <>
      <div className="login">
        <div className="login__container">
          <img src="https://nakedsecurity.sophos.com/wp-content/uploads/sites/2/2016/06/instagram.jpg" />
          <h1>Sign in to Instagram</h1>
          <Button onClick={signIn}>Sign In With Google</Button>
        </div>
      </div>
    </>
  );
};

export default Login;
