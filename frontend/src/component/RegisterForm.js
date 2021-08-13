import React from "react";
import "../App.css";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [avatar, setAvatar] = useState("");
  const [type, setType] = useState("user");

  const URL = "http://localhost:3000/api";
  let history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      name === "" ||
      email === "" ||
      password === "" ||
      gender === "" ||
      birthdate === "" ||
      avatar === ""
    ) {
      alert("Please insert all form");
    } else {
      let registerValue = {
        name,
        email,
        password,
        gender,
        birthdate,
        avatar,
        type,
      };

      postRegister(registerValue, e);
      console.log("click");
    }
  };

  const postRegister = async (item, e) => {
    try {
      const { name, email, password, gender, birthdate, avatar, type } = item;

      await axios({
        method: "POST",
        url: `${URL}/register`,
        data: {
          name,
          email,
          password,
          gender,
          birthdate,
          avatar,
          type,
        },
      });
      Swal.fire("Register Success");
      history.push("/login");
    } catch (err) {
      console.log("error");
    }
  };
  return (
    <>
      <form action="">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Full Name
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Rita Amara"
            onChange={(e) => setName(e.target.value)}
          />

          <label for="exampleFormControlInput1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label for="exampleFormControlInput1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="ex: 123ABCabc"
            onChange={(e) => setPassword(e.target.value)}
          />

          <label for="exampleFormControlInput1" class="form-label">
            Birth date
          </label>
          <input
            type="date"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder=""
            onChange={(e) => setBirthdate(e.target.value)}
          />
          <label for="gender" class="form-label">
            Gender
          </label>
          <select
            class="form-select form-select-sm"
            aria-label=".form-select-sm example"
            id="gender"
            onChange={(e) => setGender(e.target.value)}
          >
            <option defaultValue="">Choose..</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Rather Not to Say">Rather Not to Say</option>
          </select>

          <label for="exampleFormControlInput1" class="form-label">
            Image URL
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            onChange={(e) => setAvatar(e.target.value)}
          />

          <label for="exampleFormControlInput1" class="form-label">
            Type
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            defaultValue="user"
            readOnly
            onChange={(e) => setType(e.target.value)}
          />
          <div class="submit-register">
            <button
              className="btn btn-primary btn-dark"
              onClick={(e) => submitHandler(e)}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default RegisterForm;
