import React from "react";
import "../App.css";
import { TableCart } from "../component";
import { NavbarAfterLogIn } from "../component";

function Cart() {
  return (
    <div>
      <div class="container-lg title">
        <h1>CART</h1>
      </div>

      <table class="table table-borderless cart-table">
        <thead className="head-table">
          <tr className="table-secondary">
            <th scope="col">No.</th>
            <th scope="col">Picture</th>
            <th scope="col">Item Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">amount</th>
          </tr>
        </thead>
        <TableCart />
      </table>
      <hr />
      <div class="container-lg">
        <div className="item-total">
          <div class="total">
            <strong>Item Total:</strong>
          </div>
          <div class="total">
            <strong>IDR 1234000</strong>
          </div>
        </div>
      </div>
      <div class="container-lg checkout-button">
        <div className="item-total">
          <div class="total">
            <button type="button" class="btn btn-dark">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
