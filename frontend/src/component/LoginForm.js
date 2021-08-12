import React from "react";
import "../App.css";
function LoginForm() {
  return (
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
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label for="floatingPassword">Password</label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit">
          Sign In
        </button>
        <p class="mt-5 mb-3 text-muted">© 2021–2100</p>
      </form>
    </div>
  );
}

export default LoginForm;
