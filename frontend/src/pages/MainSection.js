import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import { ProductDetail, Cart, Profile, PlaceOrder, Product } from ".";
import { NavbarAfterLogIn } from "../component";

function MainSection({ login, userLogin }) {
  return (
    <>
      <NavbarAfterLogIn login={login} userLogin={userLogin} />
      <Switch>
        <Route exact path="/profile" component={Profile}></Route>
        <Route exact path="/product/:page" component={Product}></Route>
        <Route exact path="/cart" component={Cart}></Route>
        <Route exact path="/place_order" component={PlaceOrder}></Route>
        <Route
          exact
          path="/product/detail/:id"
          component={ProductDetail}
        ></Route>
      </Switch>
    </>
  );
}

export default MainSection;
