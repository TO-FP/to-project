import React from "react";

function OrderForm() {
  return (
    <div class="col-sm-8 form-order">
      <form action="">
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">
            Name
          </label>
          <div class="col-sm-10">
            <input
              class="form-control"
              id="inputEmail3"
              placeholder="Username"
              readOnly
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">
            Address
          </label>
          <div class="col-sm-10">
            <input
              type="email"
              class="form-control"
              id="inputEmail3"
              placeholder="Email"
            />
          </div>
        </div>
        <div class="form-group row">
          <div class="col">
            <label className=" col-sm-2 col-form-label" for="">
              City
            </label>
            <input type="text" />
          </div>
          <div class="col">
            <label className=" col-sm-2 col-form-label" for="">
              State
            </label>
            <input type="text" />
          </div>
          <div class="col">
            <label className=" col-sm-2 col-form-label" for="">
              Zip
            </label>
            <input type="text" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default OrderForm;
