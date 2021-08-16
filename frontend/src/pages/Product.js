import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { Blocking, NavbarAfterLogIn, ProductCard } from "../component";
import { useState } from "react";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
function Product() {
  const URL = "http://localhost:3000/api";
  const [item, setItem] = useState([]);
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);
  // useEffect(() => {
  //   getItem();
  // }, []);
  // const getItem = () => {
  //   axios({
  //     method: "GET",
  //     url: `${URL}/products`,
  //   }).then((item) => {
  //     setItem(item.data.products);
  //     // console.log(item.data.products);
  //   });
  // };
  const params = useParams();
  const pageid = +params.page;

  const [productPage, setProductPage] = useState(0);

  const handlePageClick = async (event) => {
    let page = event.selected;
    console.log("click");
    // console.log(page + 1);
    await axios({
      method: "POST",
      url: `${URL}/products/${page + 1}`,
    }).then((item) => {
      setItem(item.data.products);
      setProductPage(item.data.totalPage);
    });
  };

  useEffect(() => {
    getPage();
  }, []);

  const getPage = async (sort) => {
    await axios({
      method: "POST",
      url: `${URL}/products`,
      data: { sort: sort },
    }).then((item) => {
      setItem(item.data.products);
      setProductPage(item.data.totalPage);
    });
  };
  const sortClick = (e, sort) => {
    e.preventDefault();
    // console.log("click");
    // console.log(sort);
    getPage(sort);
  };

  console.log(productPage);

  // console.log(item);
  // let pageCount = Math.ceil(item.length / 10);
  // console.log(item.length);
  // console.log(pageCount);
  // let pageCount = () => {
  //   let length = item.length;
  // console.log(item);
  // };
  // let count = 0;

  // console.log(productPage);
  return (
    <div>
      {/* <NavbarAfterLogIn /> */}
      <div className="title product-header">
        <h1>HackShoes</h1>
      </div>
      <Blocking />
      <div class="container-lg product-show">
        <div class="row">
          <div class="col-sm-4 product-navigate">
            <div class="container-md side-image">
              <img
                src="https://i.pinimg.com/originals/94/79/06/947906a9f271248ae8496194528d105e.png"
                alt=""
              />
            </div>
            <div class="container-md side-image">
              <img
                src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/8ce9c392509187.5e4d193c2c5cf.png"
                alt=""
              />
            </div>
            <div class="container-md side-image">
              <img
                src="https://ae01.alicdn.com/kf/HTB1AkMtaeH2gK0jSZJnq6yT1FXab/Michael-Jordan-Shoes-Poster-Air-Max-Shoes-Sneaker-Posters-White-Paper-Posters-Wall-Art-Picture-for.jpg"
                alt=""
              />
            </div>
          </div>
          <div class="col-sm-8">
            <div class="container sorting">
              <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>Sort By</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={(e) => sortClick(e, "all")}>
                    All
                  </DropdownItem>
                  <DropdownItem onClick={(e) => sortClick(e, "newest")}>
                    Newest
                  </DropdownItem>
                  <DropdownItem onClick={(e) => sortClick(e, "oldest")}>
                    Oldest
                  </DropdownItem>
                  <DropdownItem onClick={(e) => sortClick(e, "low-price")}>
                    low-price
                  </DropdownItem>
                  <DropdownItem onClick={(e) => sortClick(e, "high-price")}>
                    high-price
                  </DropdownItem>
                  <DropdownItem onClick={(e) => sortClick(e, "total-sold")}>
                    total-sold
                  </DropdownItem>
                  <DropdownItem onClick={(e) => sortClick(e, "rating")}>
                    rating
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
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
                // console.log(img_file);
                // console.log(item.UserId);
                return (
                  <ProductCard
                    item={item.name}
                    price={item.price}
                    brand={item.brand}
                    img={fileName}
                    id={item.id}
                    toko={item.User.name}
                    tokoid={item.UserId}
                  />
                );
              })}

              {/* <div class="container">
                <Link className="btn btn-primary btn-page" to="/product/1">
                  1
                </Link>
                <Link className="btn btn-primary btn-page" to="/product/2">
                  2
                </Link>
                <Link className="btn btn-primary btn-page" to="/product/3">
                  3
                </Link>
              </div> */}
              <div class="container">
                <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  pageCount={productPage}
                  onPageChange={(event) => handlePageClick(event)}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
