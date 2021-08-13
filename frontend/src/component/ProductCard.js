import React from "react";
import { Link } from "react-router-dom";
function ProductCard({ item, price, brand, img, id }) {
  // console.log(item);

  return (
    <div class="card">
      <img src={`${img}`} alt="..." />
      <div class="card-body">
        <h5 class="card-title">{item}</h5>
        <p class="card-text">{brand}</p>
        <p class="card-text">{price}</p>
        <Link to={`/product/detail/${id}`} class="btn btn-primary">
          Detail/Buy
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
