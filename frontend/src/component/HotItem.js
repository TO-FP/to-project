import React from "react";

function HotItem({ item, price, brand, img }) {
  // console.log(img);
  return (
    <div className="card card-size">
      {/* // image */}
      <img src={`http://localhost:3000/images/products/${img}`} alt="..." />
      <p>{"NEW ITEMS"}</p>
      {/* ... */}

      <div className="card-body">
        <p>{item}</p>
        <p>IDR {price}</p>
        <p>Brand: {brand}</p>
      </div>
    </div>
  );
}

export default HotItem;
