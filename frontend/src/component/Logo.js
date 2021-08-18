import react from "react";
import "../Main-home.css";
import "../App.css";

import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <span>
      <h1>HackShoes</h1>
      <div class="btn-group" role="group" aria-label="Basic example">
        <Link to="/login" type="button" class="btn btn-primary log-reg-button">
          Login
        </Link>
        <Link
          to="/register"
          type="button"
          class="btn btn-primary log-reg-button"
        >
          Register
        </Link>
      </div>
    </span>
  );
};

export default Logo;
