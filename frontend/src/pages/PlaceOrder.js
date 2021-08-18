import React from "react";
import { OrderForm, OrderSummary } from "../component";
import "../App.css";

function PlaceOrder() {
  return (
    <div class="container-lg">
      <div class="title">
        <h1>Place Order</h1>
        <div class="container-lg summary-order">
          <div class="row">
            <OrderForm />
            <OrderSummary />
          </div>
        </div>
      </div>
      <hr />
      <div class="container place-order-button">
        <button className="btn btn-dark">Submit</button>
      </div>
    </div>
  );
}

export default PlaceOrder;
