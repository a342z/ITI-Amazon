import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
// import Login from "./Login";

function Login() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [email, setEmail] = useState();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [password, setPassword] = useState();
  const signIn = (e) => {
    e.preventDefault();
  };
  const register = (e) => e.preventDefault();
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="images/simple-vector-filled-flat-amazon-icon-logo-solid-black-pictogram-isolated-white-background-amazon-logo-159029074.jpg"
          alt="amazon logo "
        />
      </Link>
      <div className="login__container">
        <h1>Sign In</h1>
        <form>
          <h5>E-mail </h5>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={signIn}
            type="submit"
            className="login__signin__button"
          >
            Sign In
          </button>
        </form>
        <p>
          by signing in you agree to our application conditions of use & sale .
          please see your privacy notice{" "}
        </p>
        <button onClick={register} className="login__registerbutton">
          Create Your Account
        </button>
      </div>
    </div>
  );
}

export default Login;
