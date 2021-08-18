import React, { useState, useEffect } from "react";
import { Breadcrumbs } from "../../components";
import { getOrder } from "../../API/admin";
import { useHistory } from "react-router-dom";

const Order = () => {
  const history = useHistory();
  const access_token = localStorage.getItem("access_token");

  // const [status, setStatus] = useState("all");
  const [orders, setOrders] = useState([]);

  const getData = async (status) => {
    if (!status) status = "all";
    const res = await getOrder(access_token, status);
    setOrders(res);
  };

  const handleDetails = (orderName) => {
    history.push(`/order-details/${orderName.substring(7)}`);
  };

  const handleChangeStatus = (e) => {
    getData(e.target.value);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(orders);
  return (
    <>
      <Breadcrumbs page="orders" />
      <div className="mainBG">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">
                <span className="form-control" style={{ border: 0 }}>
                  Order Name
                </span>
              </th>
              <th scope="col">
                <span className="form-control" style={{ border: 0 }}>
                  Total Product
                </span>
              </th>
              <th scope="col">
                <span className="form-control" style={{ border: 0 }}>
                  Total Item
                </span>
              </th>
              <th scope="col">
                <span className="form-control" style={{ border: 0 }}>
                  Total Price
                </span>
              </th>
              <th>
                <select
                  name="status"
                  className="form-control"
                  defaultValue=" "
                  onChange={(e) => {
                    handleChangeStatus(e);
                  }}
                >
                  <option value=" " disabled>
                    status
                  </option>
                  <option value="all">All</option>
                  <option value="paid">Paid</option>
                  <option value="shipping">Shipping</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="closed">Closed</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <>
                  {order.Line_items.length > 0 && (
                    <>
                      <tr>
                        <td scope="col">
                          <span
                            style={{ color: "#0047AB", cursor: "pointer" }}
                            onClick={() => handleDetails(order.name)}
                          >
                            {order.name}
                          </span>
                        </td>
                        <td scope="col">{`${order.Line_items.length} products`}</td>
                        <td scope="col">{`${order.totalQty} items`}</td>
                        <td scope="col">{`IDR ${order.subtotal}`}</td>
                        <td>
                          <div
                            style={{
                              minWidth: 100,
                              maxWidth: 100,
                              padding: 5,
                              backgroundColor:
                                order.status === "open"
                                  ? "#c4c4c4"
                                  : order.status === "cancelled"
                                  ? "red"
                                  : order.status === "paid"
                                  ? "#32CD32"
                                  : order.status === "shipping"
                                  ? "orange"
                                  : order.status === "closed"
                                  ? "#000"
                                  : "#c4c4c4",
                              color: "#fff",
                            }}
                          >
                            {order.status}
                          </div>
                        </td>
                      </tr>
                    </>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Order;
