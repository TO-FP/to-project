import React from "react";
import "../App.css";
import { NavbarAfterLogIn } from "../component";

function ProductDetail() {
  return (
    <div>
      <NavbarAfterLogIn />
      <div class="container-lg title">
        <h1>Product Name</h1>
      </div>
      <div class="container-lg detail">
        <div class="row">
          <div class="col-sm-4">
            <img
              className="product-img"
              src="https://images.unsplash.com/photo-1543508282-5c1f427f023f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=658&q=80"
              alt=""
            />
          </div>
          <div class="col-sm-4">
            <h5>Description : </h5>
            <p>Product Description</p>
            <h5>Price :</h5>
            <p>Price</p>
            <h5>Weight:</h5>
            <p>Weight</p>
            <h5>Stock</h5>
            <p>Stock</p>
          </div>
          <div class="col-sm-4">
            <h5>Category:</h5>
            <p>Category</p>
            <h5>Brand</h5>
            <p>Brand</p>
            <h5>Condition</h5>
            <p>Condition</p>
            <h5>Rating</h5>
            <p>Product Rating</p>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4"></div>
          <div class="col-sm-8">
            <form
              action="
            "
            >
              <div class="row">
                <div class="col">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Select Quantity</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div class="col">
                  <button type="button" class="btn btn-dark">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
