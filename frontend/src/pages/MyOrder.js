import React from "react";
// import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function MyOrder() {
  const token = localStorage.getItem("access_token");
  const URL = "http://localhost:3000/api";
  const [order, setOrder] = useState({});
  const [item, setItem] = useState([]);

  // const item =

  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async () => {
    await axios({
      method: "GET",
      url: `${URL}/show-order`,
      headers: { access_token: token },
    }).then((item) => {
      setItem(item.data.order);
      setOrder(item);

      // console.log(item.data.shoppingCarts);
    });
  };

  console.log(item);
  // console.log(item);

  // const [...cart] = order.data.shoppingCarts;
  return (
    <div className="container-lg">
      <div className="container">
        <div class="title">
          <h1>My Order:</h1>
        </div>

        {item.map((cart) => {
          // let [...item] = cart.Line_items;

          return (
            <div className="container-sm ">
              <div class="row">
                <div class="col">
                  <p>
                    {" "}
                    <h5>Order Name: </h5>
                  </p>
                </div>

                <div class="col"></div>
                <div class="col">
                  {" "}
                  <p>{cart.name}</p>
                </div>
                <div class="col"></div>
              </div>
              <div class="row">
                <div class="col">
                  <p>
                    {" "}
                    <h5>total qty: </h5>
                  </p>
                </div>

                <div class="col"></div>
                <div class="col">
                  {" "}
                  <p>{cart.totalQty}</p>
                </div>
                <div class="col"></div>
              </div>

              <div class="row">
                <div class="col">
                  <p>
                    {" "}
                    <h5>Subtotal: </h5>
                  </p>
                </div>

                <div class="col"></div>
                <div class="col"></div>
                <div class="col">
                  {" "}
                  <p>{cart.subtotal}</p>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <p>
                    {" "}
                    <h5>Discount: </h5>
                  </p>
                </div>

                <div class="col"></div>
                <div class="col"></div>
                <div class="col">
                  {" "}
                  <p>{cart.discount}</p>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <p>
                    {" "}
                    <h5>tax: </h5>
                  </p>
                </div>

                <div class="col"></div>
                <div class="col"></div>
                <div class="col">
                  {" "}
                  <p>10%</p>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <p>
                    {" "}
                    <h5>total due:</h5>
                  </p>
                </div>

                <div class="col"></div>
                <div class="col"></div>
                <div class="col">
                  {" "}
                  <p>{cart.totalDue}</p>
                </div>
              </div>
              <hr />
            </div>
          );
        })}

        <div class="container">
          <div class="row row-cols-4">
            <div class="col"></div>
            <div class="col">
              <p></p>
            </div>
            <div class="col">
              <p></p>
            </div>
            <div class="col"></div>
          </div>
        </div>

        <div class="container">
          <div class="row row-cols-4">
            <div class="col">
              <p></p>
            </div>
            <div class="col">
              <p></p>
            </div>
            <div class="col">
              <p></p>
            </div>
            <div class="col"></div>
          </div>
        </div>

        <div class="container">
          <div class="row row-cols-4">
            <div class="col">
              <p></p>
            </div>
            <div class="col">
              <p></p>
            </div>
            <div class="col">
              <p></p>
            </div>
            <div class="col"></div>
          </div>
        </div>

        <hr />

        <div class="container">
          <div class="row row-cols-4">
            <div class="col">
              <p></p>
            </div>
            <div class="col">
              <p></p>
            </div>
            <div class="col">
              <p></p>
            </div>
            <div class="col"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyOrder;
