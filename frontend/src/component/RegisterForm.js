import React from "react";
import "../App.css";
function RegisterForm() {
  return (
    <>
      <form action="">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Username
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />

          <label for="exampleFormControlInput1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />

          <label for="exampleFormControlInput1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />

          <label for="exampleFormControlInput1" class="form-label">
            Birth date
          </label>
          <input
            type="date"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
          <label for="gender" class="form-label">
            Gender
          </label>
          <select
            class="form-select form-select-sm"
            aria-label=".form-select-sm example"
            id="gender"
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
          />
          <div class="submit-register">
            <button className="btn btn-primary btn-dark">Submit</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default RegisterForm;
