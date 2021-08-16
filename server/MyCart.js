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
      {transactions.map((transaction) => {
        return (
          <div style={{ marginTop: 30 }}>
            <div className="row">
              <div className="col-6">
                <table className="table" style={{ marginTop: 50 }}>
                  <tr>
                    <th>product</th>
                    <th style={{ width: 200 }}>name</th>
                    <th>qty</th>
                    <th>price</th>
                  </tr>
                  {transaction.Line_items.map((item) => {
                    console.log(item.Product.Products_images[0].fileName);
                    return (
                      <>
                        <tr>
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
                className="col-4"
                style={{ width: 500, marginTop: 50, border: "1px solid black" }}
              >
                <table style={{ marginTop: 30 }}>
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
                </table>
                <button
                  className="btn btn-primary w-100"
                  onClick={() => confirmHandler()}
                >
                  Confirm order
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyCart;
