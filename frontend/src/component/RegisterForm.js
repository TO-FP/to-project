import React from "react";
import "../App.css";
<<<<<<< HEAD
function RegisterForm() {
  return (
    <>
      <form action="">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Username
=======
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { FormGroup } from "react-bootstrap";
function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [avatar, setAvatar] = useState();
  const [type, setType] = useState("user");

  const URL = "http://localhost:3000/api";
  let history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("click");

    if (
      name === "" ||
      email === "" ||
      password === "" ||
      gender === "" ||
      birthdate === ""
    ) {
      alert("Please insert all form");
    } else {
      let registerValue = {
        name,
        email,
        password,
        gender,
        birthdate,
        type,
      };
      const data = new FormData();
      data.append("file", avatar);
      data.append("name", name);
      data.append("email", email);
      data.append("password", password);
      data.append("birthdate", birthdate);
      data.append("type", type);

      postRegister(data, e);
      console.log("click");
    }
  };

  // console.log(avatar);

  const postRegister = async (data, e) => {
    try {
      // const { name, email, password, gender, birthdate, type } = item;

      await axios({
        method: "POST",
        url: `${URL}/register`,
        data,
      });
      Swal.fire("Register Success");
      history.push("/login");
    } catch (err) {
      console.log("error");
    }
  };
  return (
    <>
      <form action="" className="label-text">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Full Name
>>>>>>> user
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
<<<<<<< HEAD
            placeholder="name@example.com"
=======
            placeholder="Rita Amara"
            onChange={(e) => setName(e.target.value)}
>>>>>>> user
          />

          <label for="exampleFormControlInput1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
<<<<<<< HEAD
=======
            onChange={(e) => setEmail(e.target.value)}
>>>>>>> user
          />

          <label for="exampleFormControlInput1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleFormControlInput1"
<<<<<<< HEAD
            placeholder="name@example.com"
=======
            placeholder="ex: 123ABCabc"
            onChange={(e) => setPassword(e.target.value)}
>>>>>>> user
          />

          <label for="exampleFormControlInput1" class="form-label">
            Birth date
          </label>
          <input
            type="date"
            class="form-control"
            id="exampleFormControlInput1"
<<<<<<< HEAD
            placeholder="name@example.com"
=======
            placeholder=""
            onChange={(e) => setBirthdate(e.target.value)}
>>>>>>> user
          />
          <label for="gender" class="form-label">
            Gender
          </label>
          <select
            class="form-select form-select-sm"
            aria-label=".form-select-sm example"
            id="gender"
<<<<<<< HEAD
=======
            onChange={(e) => setGender(e.target.value)}
>>>>>>> user
          >
            <option defaultValue="">Choose..</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Rather Not to Say">Rather Not to Say</option>
          </select>

<<<<<<< HEAD
          <label for="exampleFormControlInput1" class="form-label">
            Image URL
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
=======
          <label for="inputGroupFile01" class="form-label">
            Upload Image File
          </label>
          <input
            type="file"
            class="form-control"
            id="inputGroupFile01"
            onChange={(e) => setAvatar(e.target.files[0])}
>>>>>>> user
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
<<<<<<< HEAD
          />
          <div class="submit-register">
            <button className="btn btn-primary btn-dark">Submit</button>
=======
            onChange={(e) => setType(e.target.value)}
          />
          <div class="submit-register">
            <button
              className="btn btn-primary btn-dark"
              onClick={(e) => submitHandler(e)}
            >
              Submit
            </button>
>>>>>>> user
          </div>
        </div>
      </form>
    </>
  );
}

export default RegisterForm;
