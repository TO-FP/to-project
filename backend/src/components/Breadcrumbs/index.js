import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Breadcrumbs = ({ page, params }) => {
  if (!page || page === "") {
    return (
      <div className="breadcrumbs">
        <Link to="/" className="breadcrumbs-link breadcrumbs-active">
          Dashboard
        </Link>
      </div>
    );
  }

  if (page === "account") {
    return (
      <div className="breadcrumbs">
        <Link to="/accounts" className="breadcrumbs-link breadcrumbs-active">
          Account
        </Link>
      </div>
    );
  }

  if (page === "users") {
    return (
      <div className="breadcrumbs">
        <Link to="/" className="breadcrumbs-link">
          Dashboard
        </Link>
        <span className="breadcrumbs-link"> / </span>
        <Link to="/users" className="breadcrumbs-link breadcrumbs-active">
          User
        </Link>
      </div>
    );
  }

  if (page === "products") {
    return (
      <div className="breadcrumbs">
        <Link to="/" className="breadcrumbs-link">
          Dashboard
        </Link>
        <span className="breadcrumbs-link"> / </span>
        <Link to="/products" className="breadcrumbs-link breadcrumbs-active">
          Products
        </Link>
      </div>
    );
  }

  if (page === "my-products") {
    return (
      <div className="breadcrumbs">
        <Link to="/" className="breadcrumbs-link">
          Dashboard
        </Link>
        <span className="breadcrumbs-link"> / </span>
        <Link to="/my-products" className="breadcrumbs-link breadcrumbs-active">
          My Products
        </Link>
      </div>
    );
  }

  if (page === "products-add") {
    return (
      <div className="breadcrumbs">
        <Link to="/" className="breadcrumbs-link">
          Dashboard
        </Link>
        <span className="breadcrumbs-link"> / </span>
        <Link to="/products" className="breadcrumbs-link ">
          Products
        </Link>
        <span className="breadcrumbs-link"> / </span>
        <Link
          to="/products/add"
          className="breadcrumbs-link breadcrumbs-active"
        >
          Add
        </Link>
      </div>
    );
  }

  if (page === "products-details") {
    return (
      <div className="breadcrumbs">
        <Link to="/" className="breadcrumbs-link">
          Dashboard
        </Link>
        <span className="breadcrumbs-link"> / </span>
        <Link to="/products" className="breadcrumbs-link">
          Products
        </Link>
        <span className="breadcrumbs-link"> / </span>
        <Link
          to={`/product-details/${params.id}`}
          className="breadcrumbs-link breadcrumbs-active"
        >
          Products Details
        </Link>
      </div>
    );
  }

  if (page === "products-details-edit") {
    return (
      <div className="breadcrumbs">
        <Link to="/" className="breadcrumbs-link">
          Dashboard
        </Link>
        <span className="breadcrumbs-link"> / </span>
        <Link to="/products" className="breadcrumbs-link">
          Products
        </Link>
        <span className="breadcrumbs-link"> / </span>
        <Link to={`/product-details/${params.id}`} className="breadcrumbs-link">
          Products Details
        </Link>
        <span className="breadcrumbs-link"> / </span>
        <Link
          to={`/product-details/${params.id}/edit`}
          className="breadcrumbs-link breadcrumbs-active"
        >
          Edit
        </Link>
      </div>
    );
  }

  if (page === "orders") {
    return (
      <div className="breadcrumbs">
        <Link to="/" className="breadcrumbs-link">
          Dashboard
        </Link>
        <span className="breadcrumbs-link"> / </span>
        <Link to="/orders" className="breadcrumbs-link breadcrumbs-active">
          Orders
        </Link>
      </div>
    );
  }

  if (page === "orders-details") {
    return (
      <div className="breadcrumbs">
        <Link to="/" className="breadcrumbs-link">
          Dashboard
        </Link>
        <span className="breadcrumbs-link"> / </span>
        <Link to="/orders" className="breadcrumbs-link ">
          Orders
        </Link>
        <span className="breadcrumbs-link"> / </span>
        <Link
          to={`/order-details/${params}`}
          className="breadcrumbs-link breadcrumbs-active"
        >
          Order Details
        </Link>
      </div>
    );
  }
};

export default Breadcrumbs;
