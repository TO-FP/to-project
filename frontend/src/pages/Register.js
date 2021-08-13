import React from "react";
import { RegisterForm } from "../component";
import { NavBar } from "../component";
function Register() {
  return (
    <>
      <NavBar />
      <div className="login-register">
        <RegisterForm />
      </div>
    </>
  );
}

export default Register;
