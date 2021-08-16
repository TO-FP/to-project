import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { Blocking, NavbarAfterLogIn, ProductCard } from "../component";
import { useState } from "react";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import { useParams } from "react-router-dom";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
function ProductByUserId() {
  const URL = "http://localhost:3000/api";
  const [item, setItem] = useState([]);
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
  const params = useParams();
  const UserId = +params.UserId;
  const page = +params.page;
  //   console.log(page);

  //   console.log(UserId);

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
  //   const params = useParams();

  const [productPage, setProductPage] = useState(0);

  const handlePageClick = async (event) => {
    let page = event.selected;
    // console.log(page);
    // console.log(page + 1);
    await axios({
      method: "POST",
      url: `${URL}/products-by/${UserId}/${page + 1}`,
      data: { limit: 1 },
    }).then((item) => {
      setItem(item.data.products);
      setProductPage(item.data.totalPage);
    });
  };
  console.log(item);
  useEffect(() => {
    getPage();
  }, []);

  const getPage = async (sort) => {
    await axios({
      method: "POST",
      url: `${URL}/products-by/${UserId}`,
      data: { limit: 1, sort: sort },
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
  // console.log(productPage);

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
          <div class="col-sm-4 product-navigate">col-sm-4</div>
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

export default ProductByUserId;
