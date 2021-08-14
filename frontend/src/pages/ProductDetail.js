import React from "react";
import "../App.css";
import { NavbarAfterLogIn } from "../component";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ProductDetail() {
  const params = useParams();
  // console.log(params);
  const [item, setItem] = useState({});
  const id = +params.id;
  // console.log(id);
  const URL = "http://localhost:3000/api";

  // console.log(URL);

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    try {
      let result = await axios({
        method: "GET",
        url: `${URL}/product-details/${id}`,
      });
      setItem(result.data.product);
      setItemData(result.data.product);
      // console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const cek = localStorage;
  const UserId = JSON.parse(cek["user_data"]).id;
  // console.log(item);

  const { name, desc, price, weight, category, brand, condition } = item;

  const [itemData, setItemData] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    postToCart();
    console.log("click");
  };

  const postToCart = async () => {
    await axios({
      method: "POST",
      url: `${URL}/add-to-cart`,
      data: { UserId },
    });
  };

  const postToProduct = async () => {
    await axios({
      method: "POST",
      url: `${URL}/add-to-cart`,
    });
  };

  // console.log(item);
  return (
    <div>
      {/* <NavbarAfterLogIn /> */}
      <div class="container-lg title">
        <h1>{item.name}</h1>
      </div>
      <div class="container-lg detail">
        <div class="row">
          <div class="col-sm-4">
            <img
              className="product-img"
              src="https://images.unsplash.com/photo-1543508282-5c1f427f023f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=658&q=80"
              alt=""
            />
          </div>
          <div class="col-sm-4">
            <h5>Description : </h5>
            <p>{item.desc}</p>
            <h5>Price :</h5>
            <p>IDR {item.price}</p>
            <h5>Weight:</h5>
            <p>{item.weight} gram</p>
            <h5>Stock</h5>
            <p>{item.stock}</p>
          </div>
          <div class="col-sm-4">
            <h5>Category:</h5>
            <p>{item.category}</p>
            <h5>Brand</h5>
            <p>{item.brand}</p>
            <h5>Condition</h5>
            <p>{item.condition}</p>
            <h5>Rating</h5>
            <p>{item.rating} / 5</p>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4"></div>
          <div class="col-sm-8">
            <form
              action="
            "
            >
              <div class="row">
                <div class="col">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    onChange={(e) =>
                      setItemData({ ...itemData, stock: e.target.value })
                    }
                  >
                    <option selected>Select Quantity</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div class="col">
                  <button
                    type="button"
                    class="btn btn-dark"
                    onClick={(e) => submitHandler(e)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
