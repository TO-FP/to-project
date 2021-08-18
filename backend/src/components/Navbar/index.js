import React, { useState, useEffect } from "react";
import "./index.css";
import NotificationsIcon from "@material-ui/icons/NotificationsNone";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Link } from "react-router-dom";

const Navbar = ({ handleLogout, isUpdated }) => {
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("admin"));
    setAdmin(userData);
  }, [isUpdated]);

  return (
    <div className="navbar">
      <div className="left-menu">
        <div>HackShoes</div>
      </div>
      <div className="right-menu">
        <div className="notification">
          <NotificationsIcon />
        </div>
        <div className="avatar">
          <img
            className="image"
            src={`${process.env.REACT_APP_API_URL}/images/avatars/${admin.avatar}`}
          />
        </div>

        <div className="dropdown">
          <div className="menu" data-bs-toggle="dropdown">
            <span>{admin.name}</span>
            <ArrowDropDownIcon />
          </div>
          <ul
            className="dropdown-menu dropdown-menu-dark dropdown-menu-end"
            style={{ marginTop: 20, cursor: "pointer" }}
          >
            <li>
              <Link to="/accounts" className="dropdown-item">
                Account
              </Link>
            </li>
            <li onClick={() => handleLogout()}>
              <a className="dropdown-item">Sign Out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
