import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { Blocking, NavbarAfterLogIn, ProductCard } from "../component";
import { useState } from "react";

function Product() {
  const URL = "http://localhost:3000/api";
  const [item, setItem] = useState([]);
  useEffect(() => {
    getItem();
  }, []);
  const getItem = () => {
    axios({
      method: "GET",
      url: `${URL}/products`,
    }).then((item) => {
      setItem(item.data.products);
      // console.log(item.data.products);
    });
  };

  return (
    <div>
      {/* <NavbarAfterLogIn /> */}
      <div className="title product-header">
        <h1>HackShoes</h1>
      </div>
      <Blocking />
      <div class="container-lg product-show">
        <div class="row">
          <div class="col-sm-4 product-navigate">col-sm-4</div>
          <div class="col-sm-8">
            <div class="container sorting">
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sort
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <a class="dropdown-item" href="#">
                      Newest
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Most Sold
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Most Rated
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <hr />
            <div className="product-card">
              {item.map((item) => {
                let img_file = item.Products_images.filter((img) => {
                  if (img.primary === true) {
                    return img.fileName;
                  }
                });
                let [{ fileName }] = img_file;
                console.log(item);
                return (
                  <ProductCard
                    item={item.name}
                    price={item.price}
                    brand={item.brand}
                    img={fileName}
                    id={item.id}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
