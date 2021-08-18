<<<<<<< HEAD
import React from "react";
import "../App.css";
import { NavbarAfterLogIn } from "../component";

function ProductDetail() {
  return (
    <div>
      <NavbarAfterLogIn />
      <div class="container-lg title">
        <h1>Product Name</h1>
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
            <p>Product Description</p>
            <h5>Price :</h5>
            <p>Price</p>
            <h5>Weight:</h5>
            <p>Weight</p>
            <h5>Stock</h5>
            <p>Stock</p>
          </div>
          <div class="col-sm-4">
            <h5>Category:</h5>
            <p>Category</p>
            <h5>Brand</h5>
            <p>Brand</p>
            <h5>Condition</h5>
            <p>Condition</p>
            <h5>Rating</h5>
            <p>Product Rating</p>
=======
import React, { Component } from "react";
// import Slider from "react-slick";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import "../App.css";
import { NavbarAfterLogIn } from "../component";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function ProductDetail() {
  const params = useParams();
  // console.log(params);
  const [item, setItem] = useState({});
  const productId = +params.id;
  // console.log(id);
  const URL = "http://localhost:3000/api";
  const [image, setImages] = useState([]);

  // console.log(URL);

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    try {
      let result = await axios({
        method: "GET",
        url: `${URL}/product-details/${productId}`,
      });
      setItem(result.data.product);
      setItemData(result.data.product);
      setImages(result.data.product.Products_images);
      // console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(image);
  const cek = localStorage;
  // const userId = JSON.parse(cek["user_data"]).id;
  // const userName = JSON.parse(cek["user_data"]).name;
  const token = localStorage.getItem("access_token");
  console.log(token);

  // console.log(userName);
  // console.log(item);

  const [itemData, setItemData] = useState();

  const [qty, setQty] = useState(0);

  const submitHandler = (e) => {
    e.preventDefault();

    postToProduct(qty);
    // console.log("click");
  };

  console.log(qty);
  const postToProduct = async (qty) => {
    await axios({
      method: "POST",
      url: `${URL}/product-details/${productId}/add-to-cart`,
      data: { qty },
      headers: {
        // "Content-Type": "multipart/form-data",
        access_token: token,
      },
    });
    Swal.fire("Added to Cart");
  };
  // console.log(typeof qty);
  // console.log(item.desc);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 3,
  };
  return (
    <div>
      {/* <NavbarAfterLogIn /> */}

      <div class="container-lg title">
        <h1>{item.name}</h1>
      </div>
      <div class="container-lg detail">
        <div class="row ">
          <div class="container col-sm-4">
            {image.length > 0 && (
              <Slide easing="ease">
                {image.map((i, idx) => {
                  return (
                    <div class="slides" key={idx}>
                      <img
                        key={idx}
                        className=""
                        src={`http://localhost:3000/images/products/${i.fileName}`}
                        alt=""
                      />
                    </div>
                  );
                })}
              </Slide>
            )}
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
            <p>People who views this product</p>
            <p>{item.views}</p>
>>>>>>> user
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
<<<<<<< HEAD
                  >
                    <option selected>Select Quantity</option>
=======
                    onChange={(e) => setQty(e.target.value)}
                  >
                    <option value="0" selected>
                      Select Quantity
                    </option>
>>>>>>> user
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div class="col">
<<<<<<< HEAD
                  <button type="button" class="btn btn-dark">
=======
                  <button
                    type="button"
                    class="btn btn-dark"
                    onClick={(e) => submitHandler(e)}
                  >
>>>>>>> user
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
