import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="col-2">
      <div className="sidebar">
        <div className="menu-container">
          <div className="menus">
            <Link to="/" className="menu">
              <div>Dashboard</div>
            </Link>
            <h6>Menu</h6>

            <Link to="/products" className="menu">
              <div style={{ marginBottom: 10 }}>All Products</div>
            </Link>
            <Link to="/my-products" className="menu">
              <div style={{ marginBottom: 10 }}>My Products</div>
            </Link>
            <Link to="/orders" className="menu">
              <div>Orders</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
