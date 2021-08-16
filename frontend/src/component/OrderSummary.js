import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
function OrderSummary() {
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
      setOrder(item.data);

      // console.log(item.data.shoppingCarts);
    });
  };

  console.log(order);
  // console.log(item);

  // const [...cart] = order.data.shoppingCarts;
  return (
    <div className="col-sm-4 summary-order">
      <div className="container">
        <h1>Order Summary:</h1>
        {item.map((cart) => {
          // let [...item] = cart.Line_items;
          return (
            <>
              {cart.Line_items.map((item) => {
                // console.log(item);
                return (
                  <>
                    <h5>Item :</h5>
                    <div class="container">
                      <div class="row row-cols-4">
                        <div class="col">
                          <p>{item.Product.name}</p>
                        </div>
                        <div class="col">
                          <p>{item.qty}</p>
                        </div>
                        <div class="col">
                          <p>{item.Product.price}</p>
                        </div>
                        <div class="col">
                          <p>{item.qty * item.Product.price}</p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          );
        })}

        <div class="container">
          <div class="row row-cols-4">
            <div class="col">
              <p>
                {" "}
                <h5>Subtotal: </h5>
              </p>
            </div>
            <div class="col">
              <p></p>
            </div>
            <div class="col">
              <p></p>
            </div>
            <div class="col">
              {" "}
              <p>{order.subTotal}</p>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row row-cols-4">
            <div class="col">
              <p>
                {" "}
                <h5>Discount: </h5>
              </p>
            </div>
            <div class="col">
              <p></p>
            </div>
            <div class="col">
              <p></p>
            </div>
            <div class="col">
              {" "}
              <p>{order.discount}</p>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row row-cols-4">
            <div class="col">
              <p>
                {" "}
                <h5>Tax: </h5>
              </p>
            </div>
            <div class="col">
              <p></p>
            </div>
            <div class="col">
              <p></p>
            </div>
            <div class="col">
              {" "}
              <p>10%</p>
            </div>
          </div>
        </div>

        <hr />

        <div class="container">
          <div class="row row-cols-4">
            <div class="col">
              <p>
                {" "}
                <h5>Total Due : </h5>
              </p>
            </div>
            <div class="col">
              <p></p>
            </div>
            <div class="col">
              <p></p>
            </div>
            <div class="col">
              {" "}
              <p>IDR {order.totalDue} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
