import React, { useState, useEffect } from "react";
import { Breadcrumbs } from "../../components";
import { getOrderDetails, changeStatusOrder } from "../../API/admin";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const OrderDetail = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const params = useParams();
  const history = useHistory();

  const access_token = localStorage.getItem("access_token");
  const [orders, setOrders] = useState([]);

  const [details, setDetails] = useState({});

  const getData = async () => {
    const res = await getOrderDetails(access_token, `${params.name}`);

    console.log(res);

    // Swal.fire({
    //   icon: "error",
    //   title: "You haven't permission!",
    //   showConfirmButton: false,
    //   timer: 2000,
    // }).then(() => {
    //   history.push("/orders");
    // });

    console.log("RES: ", res);

    if (res.order[0].Line_items.length > 0) {
      setOrders(res.order);
      setDetails({
        status: res.order[0].status,
        subtotal: res.order[0].subtotal,
        buyerName: res.order[0].User.name,
        buyerAddress: res.order[0].address,
        buyerCity: res.order[0].city,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "You haven't permission!",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        history.push("/orders");
      });
    }
  };

  console.log(orders);

  const handleClick = (status) => {
    if (status === "paid") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, confirm it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await changeStatusOrder(access_token, params.name, status);
          Swal.fire(
            "Order confirmed!",
            "This order has been confirmed.",
            "success"
          );
          getData();
        }
      });
    } else if ("cancelled") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, confirm it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await changeStatusOrder(access_token, params.name, status);
          Swal.fire(
            "Order cancelled!",
            "This order has been cancelled.",
            "success"
          );
          getData();
        }
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(orders);

  // return false;
  return (
    <>
      <Breadcrumbs page="orders-details" params={params.name} />
      <div
        className="mainBG"
        style={{
          padding: 30,
        }}
      >
        {orders.length > 0 && (
          <span style={{ fontSize: 18, fontWeight: "bold", marginRight: 10 }}>
            #{orders[0].name}
          </span>
        )}

        <span
          style={{
            backgroundColor:
              details.status === "open"
                ? "#c4c4c4"
                : details.status === "cancelled"
                ? "red"
                : details.status === "paid"
                ? "#32CD32"
                : details.status === "shipping"
                ? "orange"
                : details.status === "closed"
                ? "#000"
                : "#c4c4c4",
            color: "#fff",
            padding: 5,
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 5,
          }}
        >
          {details.status}
        </span>
        <table className="table table-striped" style={{ marginTop: 70 }}>
          <thead>
            <tr>
              <th scope="col">Picture</th>
              <th scope="col">Product Name</th>
              <th scope="col">Qty</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <>
                  {order.Line_items.map((item) => {
                    return (
                      <tr>
                        <td>
                          <div className="product-image-container">
                            <img
                              className="product-image"
                              src={`${API_URL}/images/products/${item.Product.Products_images[0].fileName}`}
                              alt="product image"
                            />
                          </div>
                        </td>
                        <td scope="col">{item.Product.name}</td>
                        <td scope="col">{item.qty}</td>
                        <td scope="col">{`Rp ${
                          item.qty * item.Product.price
                        }`}</td>
                      </tr>
                    );
                  })}
                </>
              );
            })}
            <tr style={{ backgroundColor: "yellow" }}>
              <td colspan="3">Subtotal</td>
              <td>{`Rp ${details.subtotal}`}</td>
            </tr>
          </tbody>
        </table>
        <div style={{ marginTop: 30, marginLeft: 30 }}>
          <div className="row">
            <div className="col-2">Name:</div>
            <div className="col-10">{details.buyerName}</div>
          </div>
          <div className="row">
            <div className="col-2">Address:</div>
            <div className="col-10">{details.buyerAddress}</div>
          </div>
          <div className="row" style={{ marginBottom: 30 }}>
            <div className="col-2">City:</div>
            <div className="col-10">{details.buyerCity}</div>
          </div>
          <hr />
          <div>
            <div>
              {details.status !== "cancelled" &&
                details.status !== "closed" &&
                details.status === "paid" && (
                  <>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleClick("cancelled")}
                      style={{ marginRight: 10 }}
                    >
                      Cancelled
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleClick("shipping")}
                    >
                      Proceed to shipping
                    </button>
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
