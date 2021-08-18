import React from "react";
<<<<<<< HEAD

function ProductCard() {
  return (
    <div class="col-sm-8">
      <div class="container sorting">
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Sort
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a class="dropdown-item" href="#">
                Newest
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Most Sold
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Most Rated
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="product-card">
        <div class="card">
          <img
            src="https://images.unsplash.com/photo-1579338559194-a162d19bf842?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Name</p>
            <p class="card-text">Price</p>
            <a href="#" class="btn btn-primary">
              Detail/Buy
            </a>
          </div>
        </div>
        <div class="card">
          <img
            src="https://images.unsplash.com/photo-1579338559194-a162d19bf842?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Name</p>
            <p class="card-text">Price</p>

            <a href="#" class="btn btn-primary">
              Detail/Buy
            </a>
          </div>
        </div>
        <div class="card">
          <img
            src="https://images.unsplash.com/photo-1579338559194-a162d19bf842?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Name</p>
            <p class="card-text">Price</p>

            <a href="#" class="btn btn-primary">
              Detail/Buy
            </a>
          </div>
        </div>
        <div class="card">
          <img
            src="https://images.unsplash.com/photo-1579338559194-a162d19bf842?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Name</p>
            <p class="card-text">Price</p>

            <a href="#" class="btn btn-primary">
              Detail/Buy
            </a>
          </div>
        </div>
=======
import { Link } from "react-router-dom";
function ProductCard({ item, price, brand, img, id, toko, tokoid }) {
  // console.log(item);

  const URL = `http://localhost:3000/api`;
  return (
    <div class="card">
      <img src={`http://localhost:3000/images/products/${img}`} alt="..." />
      <div class="card-body">
        <h5 class="card-title">{item}</h5>
        <Link to={`/product/seller/${tokoid}/1`}>Seller: {toko}</Link>
        <p class="card-text">Brand: {brand}</p>
        <p class="card-text">IDR {price}</p>
        <Link to={`/product/detail/${id}`} class="btn btn-primary">
          Detail/Buy
        </Link>
>>>>>>> user
      </div>
    </div>
  );
}

export default ProductCard;
