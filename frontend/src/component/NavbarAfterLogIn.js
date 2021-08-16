import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function NavbarAfterLogIn({ login, userLogin }) {
  const history = useHistory();
  const logoutHandler = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Hello there..",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        userLogin(false);
        localStorage.clear();
        history.push("/");
      }
    });
  };

  return (
    <nav class="navbar navbar-dark bg-dark navbar-expand-lg  ">
      <div class="container-fluid">
        <Link class="navbar-brand" to="/product">
          HackShoes
        </Link>
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
              <Link class="nav-link" to="/product">
                Products
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/myorder">
                My Order
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/payment">
                Payment
              </Link>
            </li>
          </ul>
          <Link class="btn btn-outline-success" to="/cart">
            Cart
          </Link>
          <button
            class="btn btn-outline-success"
            type="submit"
            onClick={(e) => logoutHandler(e)}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavbarAfterLogIn;
