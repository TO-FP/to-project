import "../Main-home.css";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "../component";
<<<<<<< HEAD

import { HotItem, Logo, Banner } from "../component";
const Home = () => {
=======
import { useState, useEffect } from "react";
import axios from "axios";

import { HotItem, Logo, Banner } from "../component";
const Home = () => {
  const URL = "http://localhost:3000/api";
  const [items, setItems] = useState([]);

  useEffect(() => {
    getHotItem();
  }, []);

  const getHotItem = () => {
    axios({
      method: "GET",
      url: `${URL}/home-page`,
    }).then((item) => {
      setItems(item.data.products);
    });
  };

  // const x = items;
  // console.log(x);
>>>>>>> user
  return (
    <>
      <NavBar />
      <div className="container-home">
        <div className="cover">
          <Logo />
        </div>
      </div>
      <div class="hot-item">
        <h1>New Products</h1>
<<<<<<< HEAD
        <HotItem />
=======
        <div className="d-flex justify-content-evenly">
          {items.map((item) => {
            let img_file = item.Products_images.filter((img) => {
              if (img.primary === true) {
                return img.fileName;
              }
            });
            let [{ fileName }] = img_file;
            console.log(fileName);
            return (
              <HotItem
                item={item.name}
                price={item.price}
                brand={item.brand}
                img={fileName}
              />
            );
          })}
        </div>
>>>>>>> user
      </div>
      <Banner />
    </>
  );
};

export default Home;
