import React from "react";

function HotItem({ item, price, brand, img }) {
  // console.log(img);
  return (
    <div className="card card-size">
      {/* // image */}
      <img src={`${img}`} alt="..." />
      <p>{img}</p>
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
