import React from "react";
import { Blocking, NavbarAfterLogIn, ProductCard } from "../component";

function Product() {
  return (
    <div>
      <NavbarAfterLogIn />
      <div className="title product-header">
        <h1>HackShoes</h1>
      </div>
      <Blocking />
      <div class="container-lg product-show">
        <div class="row">
          <div class="col-sm-4 product-navigate">col-sm-4</div>
          <ProductCard />
        </div>
      </div>
    </div>
  );
}

export default Product;
