import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { LoginAPI, AdminAPI } from "../../API";
import "./index.css";

const Login = ({ handleLogin }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    const data = await LoginAPI(form);

    try {
      if (data.status === 200) {
        const authorized = await AdminAPI(data.access_token);

        if (authorized.status === 200) {
          localStorage.setItem("admin", JSON.stringify(data.user));
          localStorage.setItem("access_token", data.access_token);
          Swal.fire({
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 1000,
            width: "600px",
          });
          handleLogin();
        } else {
          throw {
            message: authorized.message,
          };
        }
      } else {
        throw {
          message: data.message,
        };
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="login">
      <div className="login-box">
        <div className="logo">
          <h4>HackShoes (Administrator)</h4>
          <div className="form-container">
            <div>
              <label>Email</label>
              <input
                className="form-control"
                type="text"
                placeholder="Masukkan email"
                name="email"
                value={form.email}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                placeholder="Masukkan password"
                name="password"
                value={form.password}
                onChange={(e) => handleChange(e)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
            </div>

            <button
              className="form-control btn btn-primary"
              onClick={() => handleSubmit()}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
