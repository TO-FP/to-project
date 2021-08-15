import React from "react";
import { Link } from "react-router-dom";
function ProductCard({ item, price, brand, img, id, toko }) {
  // console.log(item);

  return (
    <div class="card">
      <img src={`http://localhost:3000/images/products/${img}`} alt="..." />
      <div class="card-body">
        <h5 class="card-title">{item}</h5>
        <p class="card-text">Seller: {toko}</p>
        <p class="card-text">Brand: {brand}</p>
        <p class="card-text">IDR {price}</p>
        <Link to={`/product/detail/${id}`} class="btn btn-primary">
          Detail/Buy
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
