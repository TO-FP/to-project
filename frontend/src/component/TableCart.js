import React from "react";
import { Checkbox } from "../component";

import { useState } from "react";
function TableCart({
  name,
  brand,
  price,
  qty,
  img,
  num,
  id,
  handleClick,
  isCheck,
  deleteHandler,
  setItem,
  item,
  updateHandler,
  shopid,
  changeQty,
  idx,
}) {
  // console.log(item);
  const itemid = id;
  // console.log(itemid);
  // console.log(shopid);
  return (
    <tbody className="body-table">
      <tr>
        <th scope="row">{num}</th>
        <td>
          <img
            className="small-pict"
            src={`http://localhost:3000/images/products/${img}`}
            alt=""
          />
        </td>
        <td className="item-cart-name">{name}</td>
        <td>{brand}</td>
        <td className="update-number">
          <form className="update-qty" action="">
            <div class="d-inline p-1">
              <input
                id={id}
                type="text"
                defaultValue={qty}
                onChange={(e) => changeQty(e.target.id, shopid, e.target.value)}
              />
            </div>
            <div class="d-inline p-1">
              <button
                type="button"
                class="btn btn-primary btn-sm"
                onClick={(e) => updateHandler(e)}
              >
                Update
              </button>
            </div>
          </form>
        </td>
        <td>{price}</td>
        <td>{price * qty}</td>
        <td>
          <button
            class="btn btn-primary"
            type="submit"
            onClick={(e) => {
              deleteHandler(e, e.target.id);
            }}
            id={id}
          >
            X
          </button>
          {/* <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckChecked"
            />
            <label class="form-check-label" for="flexCheckChecked"></label>
          </div> */}
          {/* <Checkbox
            id={id}
            name={""}
            type={"checkbox"}
            handleClick={handleClick}
            isChecked={isCheck}
          /> */}
        </td>
      </tr>
    </tbody>
  );
}

export default TableCart;
