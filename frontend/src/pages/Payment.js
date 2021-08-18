import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Payment() {
  const payHandler = (e) => {
    e.preventDefault();
    Swal.fire("Payment Success");
  };
  return (
    <>
      <div class="container payment">
        <div className="container payment-form">
          <form action="" className="payment-form-2">
            <div class="row">
              {" "}
              <label for="pay-trans">Pay Transaction Id :</label>
            </div>
            <div class="row">
              {" "}
              <input type="text" id="pay-trans" />
            </div>
            <div class="row">
              <label for="sender">Sender Name :</label>
            </div>
            <div class="row">
              <input type="text" />
            </div>
            <div class="row">
              <label for="sender">Amount :</label>
            </div>
            <div class="row">
              {" "}
              <input type="text" />
            </div>
            <div class="row">
              <label for="sender">Payment To :</label>
            </div>
            <div class="row">
              <select class="f" aria-label="">
                <option value="" selected>
                  Select Bank
                </option>
                <option value="BCA">BCA</option>
                <option value="BNI">BNI</option>
                <option value="Mandiri">Mandiri</option>
              </select>{" "}
            </div>
            <div class="row">
              <label for="sender">
                Receipt File : <span> (max 5mb)</span>
              </label>
            </div>
            <div class="row">
              {" "}
              <input type="file" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Payment;
