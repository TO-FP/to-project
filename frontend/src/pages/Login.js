import React from "react";
import LoginForm from "../component/LoginForm";
import { NavBar } from "../component";
function Login() {
  return (
    <>
      <NavBar />
      <div className="login-register">
        <LoginForm />
      </div>
    </>
  );
}

export default Login;
