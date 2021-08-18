import React from "react";
import { Switch, Route } from "react-router-dom";
import { Sidebar } from "../../components";
import {
  Dashboard,
  Account,
  User,
  Product,
  MyProducts,
  ProductDetails,
  ProductAdd,
  ProductEdit,
  Order,
  OrderDetail,
  PayTransaction,
} from "../../pages";

const Main = ({ handleUpdateProfile }) => {
  return (
    <div
      className="row"
      style={{
        backgroundColor: "#dedede",
        marginRight: 0,
        paddingRight: 40,
      }}
    >
      <div className="col-2">
        <Sidebar />
      </div>
      <div className="col-10" style={{ paddingLeft: 40 }}>
        <Switch>
          <Route exact path="/" component={Dashboard}></Route>
          <Route path="/accounts">
            <Account handleupdatezzz={() => handleUpdateProfile()} />
          </Route>
          <Route path="/users" component={User}></Route>
          <Route path="/products/add" component={ProductAdd}></Route>
          <Route
            path="/product-details/:id/edit"
            component={ProductEdit}
          ></Route>
          <Route path="/product-details/:id" component={ProductDetails}></Route>
          <Route path="/my-products" component={MyProducts}></Route>
          <Route path="/products" component={Product}></Route>
          <Route exact path="/orders" component={Order}></Route>
          <Route path="/order-details/:name?" component={OrderDetail}></Route>

          <Route path="/pay-transaction/" component={PayTransaction}></Route>
        </Switch>
      </div>
    </div>
  );
};

export default Main;
