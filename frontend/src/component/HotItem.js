import React from "react";

<<<<<<< HEAD
function HotItem() {
  return (
    <div className="d-flex justify-content-evenly">
      <div className="card card-size">
        <img
          src="https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=658&q=80"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
      <div className="card card-size">
        <img
          src="https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=658&q=80"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
      <div className="card card-size">
        <img
          src="https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=658&q=80"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
=======
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
>>>>>>> user
      </div>
    </div>
  );
}

export default HotItem;
