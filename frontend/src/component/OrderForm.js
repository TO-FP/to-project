import axios from "axios";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

function OrderForm() {
  const token = localStorage.getItem("access_token");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  let history = useHistory();
  const URL = "http://localhost:3000/api";

  const getCheckout = async (city, address) => {
    await axios({
      method: "POST",
      url: `${URL}/checkouts`,
      data: { city, address },
      headers: { access_token: token },
    });
  };
  let fullAddress = address + " " + state + " " + zip;

  const submitHandler = (e) => {
    if (address !== "" || state !== "" || zip !== "" || city !== "") {
      e.preventDefault();
      // console.log(fullAddress);
      getCheckout(city, fullAddress);
      Swal.fire("Success");
      history.push("/payment");
    } else {
      Swal.fire("Please insert your form");
    }
  };
  // console.log(city);
  // console.log(state);
  // console.log(zip);
  // console.log(address);

  return (
    <div class="col-sm-8 form-order">
      <form action="">
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">
            Name
          </label>
          <div class="col-sm-10">
            <input
              class="form-control"
              id="inputEmail3"
              placeholder="Username"
              readOnly
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">
            Address
          </label>
          <div class="col-sm-10">
            <input
              type="email"
              class="form-control"
              id="inputEmail3"
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div class="form-group row">
          <div class="col">
            <label className=" col-sm-2 col-form-label" for="">
              City
            </label>
            <input type="text" onChange={(e) => setCity(e.target.value)} />
          </div>
          <div class="col">
            <label className=" col-sm-2 col-form-label" for="">
              State
            </label>
            <input type="text" onChange={(e) => setState(e.target.value)} />
          </div>
          <div class="col">
            <label className=" col-sm-2 col-form-label" for="">
              Zip
            </label>
            <input type="text" onChange={(e) => setZip(e.target.value)} />
          </div>
        </div>
      </form>
      <hr />
      <div class="container place-order-button">
        <button className="btn btn-dark" onClick={(e) => submitHandler(e)}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default OrderForm;
