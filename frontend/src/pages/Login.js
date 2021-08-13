import React from "react";
import LoginForm from "../component/LoginForm";
import { NavBar } from "../component";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Login({ login, userLogin, getToken, getUser }) {
  // console.log(userLogin);

  const history = useHistory();
  const URL = "http://localhost:3000/api";

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    postLogin();
  };

  const postLogin = async () => {
    try {
      const result = await axios({
        method: "POST",
        url: `${URL}/login`,
        data: loginData,
      });
      const access_token = result.data["access_token"];
      const userData = result.data.user;
      // console.log(userData);
      userLogin(true);
      getToken(access_token);
      getUser(userData);
      history.push("/profile");
    } catch (err) {
      Swal.fire("ERROR", `${err}`, "error");
    }
  };

  return (
    <>
      <NavBar />
      <div className="login-register">
        <div class="form">
          <form>
            <div class="container">
              <h1>HackShoes</h1>
            </div>

            <h1 class="h3 mb-3 fw-normal">Please Sign In/ Register</h1>

            <div class="form-floating">
              <input
                type="email"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
              <label for="floatingPassword">Password</label>
            </div>
            <button
              class="w-100 btn btn-lg btn-primary"
              type="submit"
              onClick={(e) => submitHandler(e)}
            >
              Sign In
            </button>
            <p class="mt-5 mb-3 text-muted">© 2021–2100</p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
