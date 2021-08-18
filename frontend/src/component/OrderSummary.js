import React from "react";
<<<<<<< HEAD

function OrderSummary() {
  return (
    <div className="col-sm-4">
      <div className="container">
        <h1>Order Summary:</h1>
        <h2>sadas</h2>
        <h3>sadas</h3>
=======
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
        <h3>Order Summary:</h3>
        <hr />
        {item.map((cart) => {
          // let [...item] = cart.Line_items;

          return (
            <>
              <div style={{ textAlign: "left", marginTop: 10, padding: 0 }}>
                <span>{cart.sellerName}</span>
              </div>
              <div class="container" style={{ fontSize: 10 }}>
                {cart.Line_items.map((item) => {
                  // console.log(item);
                  return (
                    <div class="row p-0">
                      <div class="col-4 p-0" style={{ textAlign: "left" }}>
                        <p>{item.Product.name}</p>
                      </div>
                      <div class="col-4 p-0">
                        <p>x{item.qty}</p>
                      </div>
                      <div class="col-4 p-0">
                        <p>IDR {item.qty * item.Product.price}</p>
                      </div>
                    </div>
                  );
                })}
                <div className="row p-0">
                  <div className="col-4 p-0" style={{ textAlign: "left" }}>
                    Discount
                  </div>
                  <div className="col-4 p-0"></div>
                  <div className="col-4 p-0">
                    {cart.discount ? `- IDR ${cart.discount}` : "-"}
                  </div>
                </div>

                <div className="row p-0 ">
                  <div className="col-4 p-0" style={{ textAlign: "left" }}>
                    Tax
                  </div>
                  <div className="col-4 p-0"></div>
                  <div className="col-4 p-0">+ IDR {cart.tax}</div>
                </div>

                <div className="row p-0" style={{ fontWeight: "bold" }}>
                  <div className="col-4 p-0" style={{ textAlign: "left" }}>
                    Total
                  </div>
                  <div className="col-4 p-0"></div>
                  <div className="col-4 p-0">IDR {cart.totalDue}</div>
                </div>
              </div>
            </>
          );
        })}
        <hr />
        <div class="container" style={{ fontSize: 12 }}>
          <div className="row p-0 mt-3" style={{ fontWeight: "bold" }}>
            <div className="col-4 p-0" style={{ textAlign: "left" }}>
              Sub Total Discount
            </div>
            <div className="col-4 p-0"></div>
            <div className="col-4 p-0">
              {order.totalDiscount > 0 ? `IDR ${order.totalDiscount}` : "-"}
            </div>
          </div>

          <div className="row p-0 mt-3" style={{ fontWeight: "bold" }}>
            <div className="col-4 p-0" style={{ textAlign: "left" }}>
              Sub Total Tax
            </div>
            <div className="col-4 p-0"></div>
            <div className="col-4 p-0">IDR {order.totalTax}</div>
          </div>
        </div>

        <hr />

        <div class="container" style={{ fontSize: 18 }}>
          <div className="row p-0" style={{ fontWeight: "bold" }}>
            <div className="col-4 p-0" style={{ textAlign: "left" }}>
              Total Due
            </div>
            <div className="col-4 p-0"></div>
            <div className="col-4 p-0">IDR {order.totalFinal}</div>
          </div>
        </div>
>>>>>>> user
      </div>
    </div>
  );
}

export default OrderSummary;
