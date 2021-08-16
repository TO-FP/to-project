import React, { useState, useEffect } from "react";
import "../App.css";
import { Blocking, TableCart } from "../component";
import { NavbarAfterLogIn, Checkbox } from "../component";
import axios from "axios";
import { array } from "prop-types";
import { Link, useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
// import { useHistory } from "react-router-dom";

function Cart() {
  const token = localStorage.getItem("access_token");
  const URL = "http://localhost:3000/api";
  const [item, setItem] = useState([]);
  const [isCheck, setIsCheck] = useState([{}]);
  const [check, setCheck] = useState([{}]);
  const [checkedCart, setCheckedCart] = useState(false);
  let history = useHistory();

  // const params = useParams();
  // const id = +params.id;

  // const [list, setList] = useState([]);
  // const [isCheckAll, setIsCheckAll] = useState("closed");

  // console.log(item);

  const handleSelectAll = (e) => {
    item.forEach((cart) => {
      let target = e.target.id;
      if (cart.id == target) {
        getCheck(target);
      }
    });
  };

  // const handleSelect = (e) => {
  //   let target = e.target;
  //   console.log(target);
  // };

  useEffect(() => {
    getCart();
  }, []);

  // let handleAll = event => {
  //   let check =
  // }
  const getCheck = (id) => {
    axios({
      method: "PUT",
      url: `${URL}/check-carts/${id}`,
      headers: { access_token: token },
    }).then((item) => {
      // setItem(item.data.cart);
      getCart();
    });
  };

  const getCart = async () => {
    await axios({
      method: "GET",
      url: `${URL}/show-cart`,
      headers: { access_token: token },
    }).then((item) => {
      setItem(item.data.cart);
      // setList(item.data.cart);
      // console.log(item);

      let checkdone = false;
      item.data.cart.forEach((item) => {
        if (item.status === "open") {
          checkdone = true;
        }
      });
      setCheckedCart(checkdone);
      // console.log(item.data.cart);
    });
  };
  // cartNum(item.length);
  // console.log(item);
  // route.delete("/carts/:id/remove", userAuth, ApiController.removeCart);
  // const id =
  const deleteHandler = (e, id) => {
    e.preventDefault();
    deleteCart(id);
  };
  const deleteCart = async (id) => {
    await axios({
      method: "DELETE",
      url: `${URL}/carts/${id}/remove-item`,
      headers: { access_token: token },
    });
    getCart();
  };
  const [updateqty, setUpdateQty] = useState({
    id: "",
    value: "",
  });
  const updateHandler = async (e, shopid) => {
    e.preventDefault();
    console.log(updateqty.id);
    await axios({
      method: "PUT",
      url: `${URL}/carts/${updateqty.id}/update-item`,
      data: { qty: updateqty.value },
      headers: { access_token: token },
    });
    Swal.fire("Quantity updated");
    getCart();
  };

  const changeQty = (id, shopid, value) => {
    setUpdateQty({ id: id, value: value });
    // e.preventDefault();
    // console.log(shopid);
    // console.log(id);
    // setItem([
    //   ...item,
    //   item[shopId]:{
    //   Line_items[id]:{
    //   qty: value
    //   }
    //   }
    //   ])
  };

  const updateQty = async (id) => {
    await axios({
      method: "PUT",
      url: `${URL}/carts/${id}/update-item`,
      headers: { access_token: token },
    });
    getCart();
  };

  const checkOutHandler = async (e) => {
    e.preventDefault();
    if (checkedCart === true) {
      Swal.fire("Checkout Success");
      history.push("/place_order");
    } else {
      Swal.fire("Choose your Cart");
    }
  };
  // console.log(item);
  // console.log(item)

  // console.log(item);
  // const catalog = list.Line_items.map(({ id, name }) => {
  //   console.log(id);
  //   return (
  //     <>
  //       <Checkbox
  //         key={id}
  //         type="checkbox"
  //         name=""
  //         id={id}
  //         handleClick={handleClick}
  //         isChecked={isCheck.includes(id)}
  //       />
  //       {name}
  //     </>
  //   );
  // });

  // console.log(catalog);
  // console.log(item);
  // console.log(item);
  let total = 0;
  return (
    <div>
      <div class="container-lg title">
        <h1>CART</h1>
      </div>

      {item.map((item, idx) => {
        // let [line_item] = item.Line_items;
        // console.log();
        return (
          <>
            <div className="checkAll">
              <div class="form-check">
                {/* <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                />
                <label class="form-check-label" for="flexCheckChecked">
                  Check All Product in Store
                </label> */}
                <Checkbox
                  id={item.id}
                  name={"Select"}
                  type={"checkbox"}
                  handleClick={(e) => handleSelectAll(e)}
                  isChecked={item.status}
                />
              </div>
            </div>
            <table class="table table-borderless cart-table">
              <thead className="head-table">
                <tr className="table-secondary">
                  <th scope="col">No.</th>
                  <th scope="col">Picture</th>
                  <th scope="col">Item Name</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">amount</th>
                  <th scope="col">Check</th>
                </tr>
              </thead>
              {item.Line_items.map((item, i) => {
                const { name, price, brand } = item.Product;
                const [{ fileName }] = item.Product.Products_images;
                const { id } = item;
                // console.log(id);
                // const {image} =
                // console.log(id);

                const qty = item.qty;
                // console.log(qty);
                total += qty * price;
                return (
                  <TableCart
                    id={id}
                    name={name}
                    price={price}
                    qty={qty}
                    brand={brand}
                    img={fileName}
                    num={i + 1}
                    deleteHandler={deleteHandler}
                    setItem={setItem}
                    item={item}
                    shopid={idx}
                    changeQty={changeQty}
                    idx={i}
                    updateHandler={updateHandler}
                  />
                );
              })}
            </table>
            <hr />
          </>
        );
      })}
      <div class="container-lg">
        <div className="item-total">
          <div class="total">
            <strong>Item Total:</strong>
          </div>
          <div class="total">
            <strong>IDR {total}</strong>
          </div>
        </div>
      </div>
      <div class="container-lg checkout-button">
        <div className="item-total">
          <div class="total">
            {/* <Link type="button" class="btn btn-dark" to="/place_order">
              Checkout
            </Link> */}
            <button
              type="button"
              class="btn btn-dark"
              to="/place_order"
              onClick={(e) => checkOutHandler(e)}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
