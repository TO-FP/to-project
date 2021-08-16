import React, { useState, useEffect } from "react";
import axios from "axios";

const MyCart = () => {
  const access_token = localStorage.getItem("access_token");
  const [transactions, setTransactions] = useState([]);

  const showOrder = async () => {
    await axios
      .get(`http://localhost:3000/api/show-order`, {
        headers: {
          access_token,
        },
      })
      .then((res) => {
        setTransactions(res.data.order);
      })
      .catch((err) => {
        alert("error");
      });
  };

  const confirmHandler = () => {};

  useEffect(() => {
    showOrder();
  }, []);

  console.log(transactions);

  return (
    <div>
      {transactions.map((transaction, i) => {
        return (
          <div style={{ marginTop: 30 }}>
            <div className="row per-myorder">
              <div className="col-6">
                <table className="table" style={{ marginTop: 50 }}>
                  <tr>
                    <th>No .</th>
                    <th>product</th>
                    <th style={{ width: 200 }}>name</th>
                    <th>qty</th>
                    <th>total price</th>
                  </tr>
                  {transaction.Line_items.map((item, i) => {
                    console.log(item.Product.Products_images[0].fileName);
                    return (
                      <>
                        <tr>
                          <td>{i + 1}</td>
                          <td>
                            <div style={{ width: 100, height: 100 }}>
                              <img
                                src={`http://localhost:3000/images/products/${item.Product.Products_images[0].fileName}`}
                                alt=""
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          </td>
                          <td>{item.Product.name}</td>
                          <td>{item.qty}</td>
                          <td>{item.qty * item.Product.price}</td>
                        </tr>
                      </>
                    );
                  })}
                </table>
              </div>
              <div
                className="col-4 "
                style={{ width: 500, marginTop: 50, border: "1px solid black" }}
                className="details"
              >
                <table style={{ marginTop: 30 }}>
                  <tr>
                    <td>No: {i + 1}</td>
                    <td style={{ width: 150 }}></td>
                    <td></td>
                  </tr>
                  <hr />
                  <tr>
                    <td>pay transaction:</td>
                    <td style={{ width: 150 }}></td>
                    <td>{transaction.payTrx}</td>
                  </tr>
                  <tr>
                    <td>subtotal</td>
                    <td style={{ width: 150 }}></td>
                    <td>Rp {transaction.subtotal}</td>
                  </tr>
                  <tr>
                    <td>discount</td>
                    <td style={{ width: 150 }}></td>
                    <td>Rp {transaction.discount}</td>
                  </tr>
                  <tr>
                    <td>tax</td>
                    <td style={{ width: 150 }}></td>
                    <td>Rp {transaction.tax}</td>
                  </tr>
                  <tr>
                    <td>total due</td>
                    <td style={{ width: 150 }}></td>
                    <td>Rp {transaction.totalDue}</td>
                  </tr>
                </table>
                <button
                  className="btn btn-primary w-100 confirm-order"
                  onClick={() => confirmHandler()}
                >
                  Confirm order
                </button>
              </div>
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default MyCart;
