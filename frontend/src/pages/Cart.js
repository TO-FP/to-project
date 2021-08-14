import React, { useState, useEffect } from "react";
import "../App.css";
import { Blocking, TableCart } from "../component";
import { NavbarAfterLogIn } from "../component";
import axios from "axios";

function Cart() {
  const token = localStorage.getItem("access_token");
  const URL = "http://localhost:3000/api";
  const [item, setItem] = useState();

  useEffect(() => {
    getCart();
  }, []);

  const getCart = () => {
    axios({
      method: "GET",
      url: `${URL}//show-cart`,
      headers: { access_token: token },
    }).then((item) => {
      setItem(item.data.cart);
    });
  };

  console.log(item);

  return (
    <div>
      <div class="container-lg title">
        <h1>CART</h1>
      </div>
      <div className="checkAll">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckChecked"
          />
          <label class="form-check-label" for="flexCheckChecked">
            Check All Product in Store
          </label>
        </div>
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
            <th scope="col">Check</th>
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
