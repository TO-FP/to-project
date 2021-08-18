import React from "react";
import { Link } from "react-router-dom";
function NavbarAfterLogIn() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          HackShoes
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li> */}
            <li class="nav-item">
              <Link class="nav-link" to="/Profile">
                My Profile
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="#">
                Products
              </Link>
            </li>
          </ul>
          <Link class="btn btn-outline-success" to="/cart">
            Cart
          </Link>
          <button class="btn btn-outline-success" type="submit">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavbarAfterLogIn;
