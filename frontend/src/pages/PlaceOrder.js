import React from "react";
import { OrderForm, OrderSummary } from "../component";
import "../App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function PlaceOrder() {
  const token = localStorage.getItem("access_token");
  const URL = "http://localhost:3000/api";
  const [order, setOrder] = useState({});
  const [item, setItem] = useState([]);

  // const item =

  useEffect(() => {
    orderSummary();
  }, []);

  const orderSummary = async () => {
    await axios({
      method: "GET",
      url: `${URL}/order-summary`,
      headers: { access_token: token },
    }).then((item) => {
      setItem(item.data.shoppingCarts);
      // console.log(item.data.shoppingCarts);
    });
  };

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
    </div>
  );
}

export default PlaceOrder;
